export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = normalizeApiPathname(url.pathname);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(),
      });
    }

    if (pathname === "/questions" && request.method === "GET") {
      const questions = [
        {
          id: "q_001",
          subject: "english",
          unit: "Reboot 1st Edition",
          question: "次の英文を和訳しなさい。",
          answerType: "text",
          correctAnswer: "私は昨日図書館に行きました。",
          choices: [],
          explanation: "went は go の過去形です。"
        }
      ];

      return json(questions);
    }

    if (pathname === "/me" && ["GET", "POST", "PATCH"].includes(request.method)) {
      return upsertCurrentReviewAccount(request, env);
    }

    if (pathname === "/education-codes/validate" && request.method === "POST") {
      return validateEducationCode(request, env);
    }

    if (pathname === "/me/answers" && request.method === "POST") {
      return createAnswer(request, env);
    }

    if (pathname === "/manager/me" && request.method === "GET") {
      return getManagerMe(request, env);
    }

    if (pathname === "/manager/access" && request.method === "GET") {
      return getManagerAccess(request, env);
    }

    if (pathname === "/manager/members" && request.method === "GET") {
      return listManagerMembers(request, env);
    }

    const managerMemberMatch = pathname.match(/^\/manager\/members\/([^/]+)$/);
    if (managerMemberMatch && request.method === "PATCH") {
      return updateManagerMember(request, env, managerMemberMatch[1]);
    }

    return json({ error: "Not Found", path: url.pathname }, 404);
  }
};

const AUTH0_JWKS_CACHE_TTL_MS = 5 * 60 * 1000;
const auth0JwksCache = new Map();
const MANAGER_USER_ROLE = "user";
const MANAGER_ROLES = ["owner", "developer", "checker", "system_designer", "character_designer"];
const MANAGER_STATUSES = ["pending", "approved", "suspended"];
const MANAGER_ROLE_PERMISSIONS = {
  owner: {
    manageSettings: true,
    manageMembers: true,
    manageInformation: true,
    createQuestions: true,
    checkQuestions: true,
    publishQuestions: true,
    changeDesign: true,
    commitDesign: true,
    manageCharacters: true,
    manageStoreItems: true,
  },
  developer: {
    createQuestions: true,
    submitQuestions: true,
  },
  checker: {
    checkQuestions: true,
    publishQuestions: true,
  },
  system_designer: {
    changeDesign: true,
    commitDesign: true,
  },
  character_designer: {
    manageCharacters: true,
    manageStoreItems: true,
  },
};

function normalizeApiPathname(pathname) {
  const normalized = String(pathname || "").replace(/\/+$/, "") || "/";
  if (normalized.startsWith("/api/")) {
    return normalized.slice(4) || "/";
  }
  return normalized;
}

async function getManagerMe(request, env) {
  const context = await getAuthenticatedSupabaseContext(request, env);
  if (!context.ok) {
    return json(context.body, context.status);
  }

  const auth0Sub = normalizeSupabaseText(context.claims?.sub);
  const auth0MemberResult = auth0Sub
    ? await getManagerMemberByAuth0Sub(context.supabase, auth0Sub)
    : { ok: true, member: null };
  if (!auth0MemberResult.ok) {
    return json(auth0MemberResult.body, auth0MemberResult.status);
  }

  const memberResult = auth0MemberResult.member
    ? auth0MemberResult
    : await getOrCreateManagerMember(context.supabase, context.user, context.claims, env);
  if (!memberResult.ok) {
    return json(memberResult.body, memberResult.status);
  }

  const member = memberResult.member;
  const role = normalizeManagerRole(member?.role);
  return json({
    canAccess: member?.status === "approved" && Boolean(role),
    status: member?.status ?? "pending",
    member,
    permissions: getManagerPermissions(role),
  });
}

async function getManagerAccess(request, env) {
  const context = await getAuthenticatedSupabaseContext(request, env);
  if (!context.ok) {
    return json(context.body, context.status);
  }

  const memberResult = await getOrCreateManagerMember(context.supabase, context.user, context.claims, env);
  if (!memberResult.ok) {
    return json(memberResult.body, memberResult.status);
  }

  const member = memberResult.member;
  const role = normalizeManagerRole(member?.role);
  return json({
    canAccess: member?.status === "approved" && Boolean(role),
    status: member?.status ?? "none",
    member,
    permissions: getManagerPermissions(role),
  });
}

async function listManagerMembers(request, env) {
  const access = await requireManagerOwner(request, env);
  if (!access.ok) {
    return json(access.body, access.status);
  }

  const response = await supabaseRequest(
    access.supabase,
    "/manager_members?select=id,user_id,auth0_sub,display_name,email,role,status,approved_at,approved_by,created_at,updated_at&order=created_at.desc"
  );
  if (!response.ok) {
    const error = await supabaseError(response, "Failed to list manager members");
    return json(error.body, error.status);
  }

  return json(await response.json());
}

async function updateManagerMember(request, env, memberId) {
  const access = await requireManagerOwner(request, env);
  if (!access.ok) {
    return json(access.body, access.status);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const roleText = normalizeSupabaseText(body?.role);
  const role = normalizeManagerRole(body?.role);
  const isUserRole = roleText === MANAGER_USER_ROLE;
  const status = normalizeManagerStatus(body?.status);
  const patch = {
    updated_at: new Date().toISOString(),
  };
  if (isUserRole) {
    patch.role = null;
    patch.status = "pending";
    patch.approved_at = null;
    patch.approved_by = null;
  } else if (role) {
    patch.role = role;
  }
  if (!isUserRole && status) {
    patch.status = status;
    if (status === "approved") {
      patch.approved_at = new Date().toISOString();
      patch.approved_by = access.member?.id ?? null;
    } else {
      patch.approved_at = null;
      patch.approved_by = null;
    }
  }
  if (!role && !status && !isUserRole) {
    return json({ error: "role or status is required" }, 400);
  }

  const response = await supabaseRequest(access.supabase, `/manager_members?id=eq.${encodeURIComponent(memberId)}`, {
    method: "PATCH",
    headers: {
      Prefer: "return=representation",
    },
    body: JSON.stringify(patch),
  });
  if (!response.ok) {
    const error = await supabaseError(response, "Failed to update manager member");
    return json(error.body, error.status);
  }

  const members = await response.json();
  return json(Array.isArray(members) ? members[0] ?? null : members);
}

async function requireManagerOwner(request, env) {
  const context = await getAuthenticatedSupabaseContext(request, env);
  if (!context.ok) {
    return context;
  }

  const memberResult = await getOrCreateManagerMember(context.supabase, context.user, context.claims, env);
  if (!memberResult.ok) {
    return memberResult;
  }

  if (memberResult.member?.status !== "approved" || memberResult.member?.role !== "owner") {
    return {
      ok: false,
      status: 403,
      body: {
        error: "Only approved owners can manage The Review Manager members.",
      },
    };
  }

  return {
    ok: true,
    ...context,
    member: memberResult.member,
  };
}

async function getAuthenticatedSupabaseContext(request, env) {
  const supabase = getSupabaseConfig(env);
  if (!supabase) {
    return {
      ok: false,
      status: 500,
      body: {
        error: "Supabase is not configured. SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.",
      },
    };
  }

  const authResult = await authenticateRequest(request, env);
  if (!authResult.ok) {
    return authResult;
  }

  const userResult = await getOrCreateUserByAuth0Sub(supabase, authResult.claims);
  if (!userResult.ok) {
    return userResult;
  }

  return {
    ok: true,
    supabase,
    claims: authResult.claims,
    user: userResult.user,
    userCreated: Boolean(userResult.created),
  };
}

async function upsertCurrentReviewAccount(request, env) {
  const context = await getAuthenticatedSupabaseContext(request, env);
  if (!context.ok) {
    return json(context.body, context.status);
  }

  const body = request.method === "GET" ? null : await readJsonBody(request);
  if (body?.ok === false) {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const payload = body?.value && typeof body.value === "object" ? body.value : {};
  const hasNicknamePatch = request.method !== "GET" && Object.prototype.hasOwnProperty.call(payload, "nickname");
  const nickname = normalizeSupabaseText(payload.nickname);
  const displayName = hasNicknamePatch && nickname ? nickname : normalizeSupabaseText(context.user?.display_name);
  let user = context.user;
  if (user?.id && hasNicknamePatch && nickname && nickname !== user.display_name) {
    const updatedUser = await updateUserById(context.supabase, user.id, {
      display_name: nickname,
    });
    if (updatedUser.ok && updatedUser.user) {
      user = updatedUser.user;
    }
  }

  const memberResult = await getOrCreateManagerMember(context.supabase, user, context.claims, env, {
    displayName,
    updateDisplayName: hasNicknamePatch && Boolean(nickname),
  });
  if (!memberResult.ok) {
    return json(memberResult.body, memberResult.status);
  }

  return json({
    user,
    managerMember: memberResult.member,
    isNewReviewAccount: Boolean(context.userCreated),
  });
}

async function validateEducationCode(request, env) {
  const body = await readJsonBody(request);
  if (body?.ok === false) {
    return json({ valid: false, message: "Invalid JSON body" }, 400);
  }

  const payload = body?.value && typeof body.value === "object" ? body.value : body && typeof body === "object" ? body : {};
  const code = normalizeEducationCode(payload.code ?? payload.educationCode ?? payload.schoolCode);
  if (!code) {
    return json({ valid: true, message: "" });
  }

  const educationCodeMap = parseEducationCodes(env);
  const match = educationCodeMap.get(code);
  if (!match) {
    return json({ valid: false });
  }

  const schoolName = normalizeSupabaseText(match.schoolName);
  const message =
    normalizeSupabaseText(match.message) ||
    (schoolName ? `これは${schoolName}のEducation Codeです。` : "Education Codeを確認しました。");
  return json({
    valid: true,
    schoolName,
    message,
  });
}

async function createAnswer(request, env) {
  const supabase = getSupabaseConfig(env);
  if (!supabase) {
    return json({ error: "Supabase is not configured. SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required." }, 500);
  }

  const authResult = await authenticateRequest(request, env);
  if (!authResult.ok) {
    return json(authResult.body, authResult.status);
  }

  const bodyResult = await readJsonBody(request);
  if (!bodyResult.ok) {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const answerPayload = normalizeAnswerPayload(bodyResult.value);
  if (!answerPayload.ok) {
    return json(
      {
        error: "Invalid answer payload",
        details: answerPayload.errors,
      },
      400
    );
  }

  const userResult = await getOrCreateUserByAuth0Sub(supabase, authResult.claims);
  if (!userResult.ok) {
    return json(userResult.body, userResult.status);
  }
  if (!userResult.user?.id) {
    return json(
      {
        error: "Answer could not be saved because the Auth0 user record has no id.",
        auth0Sub: authResult.claims.sub,
      },
      500
    );
  }

  const insertResult = await insertAnswer(supabase, {
    user_id: userResult.user.id,
    question_id: answerPayload.value.questionId,
    answer_text: answerPayload.value.answerText,
    is_correct: answerPayload.value.isCorrect,
  });
  if (!insertResult.ok) {
    return json(insertResult.body, insertResult.status);
  }

  return json(insertResult.answer, 201);
}

async function authenticateRequest(request, env) {
  const auth0 = getAuth0Config(env);
  if (!auth0) {
    return {
      ok: false,
      status: 500,
      body: {
        error: "Auth0 is not configured. AUTH0_DOMAIN and AUTH0_AUDIENCE are required.",
      },
    };
  }

  const authorization = request.headers.get("Authorization") || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    return {
      ok: false,
      status: 401,
      body: {
        error: "Authorization header must be 'Bearer <Auth0 Access Token>'.",
      },
    };
  }

  try {
    return {
      ok: true,
      claims: await verifyAuth0Jwt(match[1], auth0),
    };
  } catch (error) {
    return {
      ok: false,
      status: 401,
      body: {
        error: "Auth0 access token verification failed.",
        details: error instanceof Error ? error.message : "Unknown token verification error",
      },
    };
  }
}

function getSupabaseConfig(env) {
  const url = typeof env?.SUPABASE_URL === "string" ? env.SUPABASE_URL.replace(/\/+$/, "") : "";
  const serviceRoleKey =
    typeof env?.SUPABASE_SERVICE_ROLE_KEY === "string" ? env.SUPABASE_SERVICE_ROLE_KEY : "";

  if (!url || !serviceRoleKey) {
    return null;
  }

  return {
    url,
    serviceRoleKey,
  };
}

function getAuth0Config(env) {
  const rawDomain = typeof env?.AUTH0_DOMAIN === "string" ? env.AUTH0_DOMAIN.trim() : "";
  const audience = typeof env?.AUTH0_AUDIENCE === "string" ? env.AUTH0_AUDIENCE.trim() : "";
  if (!rawDomain || !audience) {
    return null;
  }

  const domain = rawDomain.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  const issuer = `https://${domain}/`;
  return {
    domain,
    audience,
    issuer,
    jwksUrl: `${issuer}.well-known/jwks.json`,
  };
}

function normalizeAnswerPayload(body) {
  const errors = [];
  const questionId = typeof body?.questionId === "string" ? body.questionId.trim() : "";
  const answerText = typeof body?.answerText === "string" ? body.answerText : null;
  const isCorrect = typeof body?.isCorrect === "boolean" ? body.isCorrect : null;

  if (!questionId) {
    errors.push("questionId is required");
  }
  if (answerText === null) {
    errors.push("answerText must be a string");
  }
  if (isCorrect === null) {
    errors.push("isCorrect must be a boolean");
  }

  if (errors.length > 0) {
    return {
      ok: false,
      errors,
    };
  }

  return {
    ok: true,
    value: {
      questionId,
      answerText,
      isCorrect,
    },
  };
}

async function getOrCreateUserByAuth0Sub(supabase, claims) {
  const auth0Sub = normalizeSupabaseText(claims?.sub);
  if (!auth0Sub) {
    return {
      ok: false,
      status: 401,
      body: {
        error: "Auth0 access token does not include a sub claim.",
      },
    };
  }

  const existingUser = await getUserByAuth0Sub(supabase, auth0Sub);
  if (!existingUser.ok) {
    return existingUser;
  }
  if (existingUser.user) {
    return {
      ...existingUser,
      created: false,
    };
  }

  const createdUser = await createUser(supabase, {
    auth0_sub: auth0Sub,
    display_name: getDisplayNameFromClaims(claims),
  });
  if (createdUser.ok) {
    return {
      ...createdUser,
      created: true,
    };
  }

  if (createdUser.status === 409) {
    const racedUser = await getUserByAuth0Sub(supabase, auth0Sub);
    return racedUser.ok
      ? {
          ...racedUser,
          created: false,
        }
      : racedUser;
  }

  return createdUser;
}

async function getUserByAuth0Sub(supabase, auth0Sub) {
  const response = await supabaseRequest(
    supabase,
    `/users?auth0_sub=eq.${encodeURIComponent(auth0Sub)}&select=id,auth0_sub,display_name&limit=1`
  );

  if (!response.ok) {
    return supabaseError(response, "Failed to look up the Auth0 user in Supabase");
  }

  const users = await response.json();
  return {
    ok: true,
    user: Array.isArray(users) ? users[0] ?? null : null,
  };
}

async function createUser(supabase, user) {
  const response = await supabaseRequest(supabase, "/users", {
    method: "POST",
    headers: {
      Prefer: "return=representation",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    return supabaseError(response, "Failed to create the Auth0 user in Supabase");
  }

  const users = await response.json();
  return {
    ok: true,
    user: Array.isArray(users) ? users[0] ?? null : users,
  };
}

async function updateUserById(supabase, userId, patch) {
  const response = await supabaseRequest(supabase, `/users?id=eq.${encodeURIComponent(userId)}`, {
    method: "PATCH",
    headers: {
      Prefer: "return=representation",
    },
    body: JSON.stringify(patch),
  });

  if (!response.ok) {
    return supabaseError(response, "Failed to update the Auth0 user in Supabase");
  }

  const users = await response.json();
  return {
    ok: true,
    user: Array.isArray(users) ? users[0] ?? null : users,
  };
}

async function insertAnswer(supabase, answer) {
  const response = await supabaseRequest(supabase, "/answers", {
    method: "POST",
    headers: {
      Prefer: "return=representation",
    },
    body: JSON.stringify(answer),
  });

  if (!response.ok) {
    return supabaseError(response, "Failed to insert the answer into Supabase");
  }

  const savedAnswers = await response.json();
  return {
    ok: true,
    answer: Array.isArray(savedAnswers) ? savedAnswers[0] ?? null : savedAnswers,
  };
}

async function getOrCreateManagerMember(supabase, user, claims, env, profile = {}) {
  if (!user?.id) {
    return {
      ok: false,
      status: 500,
      body: {
        error: "Manager member could not be resolved because the user record has no id.",
      },
    };
  }

  const auth0Sub = normalizeSupabaseText(claims?.sub);
  let existing = await getManagerMemberByUserId(supabase, user.id);
  if (!existing.ok) {
    return existing;
  }
  if (!existing.member && auth0Sub) {
    existing = await getManagerMemberByAuth0Sub(supabase, auth0Sub);
    if (!existing.ok) {
      return existing;
    }
  }

  const shouldBootstrapOwner = isBootstrapManagerOwner(claims, env);
  const profileDisplayName = normalizeSupabaseText(profile?.displayName);
  const shouldUpdateDisplayName = Boolean(profile?.updateDisplayName && profileDisplayName);
  const displayName =
    profileDisplayName || normalizeSupabaseText(user?.display_name) || getDisplayNameFromClaims(claims);
  const email = normalizeSupabaseText(profile?.email) || normalizeSupabaseText(claims?.email) || null;
  if (existing.member) {
    const patch = {};
    if (existing.member.user_id !== user.id) {
      patch.user_id = user.id;
    }
    if (auth0Sub && existing.member.auth0_sub !== auth0Sub) {
      patch.auth0_sub = auth0Sub;
    }
    if (
      displayName &&
      (!existing.member.display_name || (shouldUpdateDisplayName && displayName !== existing.member.display_name))
    ) {
      patch.display_name = displayName;
    }
    if (email !== (existing.member.email ?? null)) {
      patch.email = email;
    }
    if (shouldBootstrapOwner && (existing.member.role !== "owner" || existing.member.status !== "approved")) {
      Object.assign(patch, {
        role: "owner",
        status: "approved",
        approved_at: new Date().toISOString(),
      });
    }
    if (Object.keys(patch).length > 0) {
      patch.updated_at = new Date().toISOString();
      return updateManagerMemberById(supabase, existing.member.id, patch);
    }
    return existing;
  }

  return createManagerMember(supabase, {
    user_id: user.id,
    auth0_sub: auth0Sub,
    display_name: displayName,
    email,
    role: shouldBootstrapOwner ? "owner" : null,
    status: shouldBootstrapOwner ? "approved" : "pending",
    approved_at: shouldBootstrapOwner ? new Date().toISOString() : null,
  });
}

async function getManagerMemberByUserId(supabase, userId) {
  const response = await supabaseRequest(
    supabase,
    `/manager_members?user_id=eq.${encodeURIComponent(userId)}&select=id,user_id,auth0_sub,display_name,email,role,status,approved_at,approved_by,created_at,updated_at&limit=1`
  );

  if (!response.ok) {
    return supabaseError(response, "Failed to look up the manager member in Supabase");
  }

  const members = await response.json();
  return {
    ok: true,
    member: Array.isArray(members) ? members[0] ?? null : null,
  };
}

async function getManagerMemberByAuth0Sub(supabase, auth0Sub) {
  const response = await supabaseRequest(
    supabase,
    `/manager_members?auth0_sub=eq.${encodeURIComponent(auth0Sub)}&select=id,user_id,auth0_sub,display_name,email,role,status,approved_at,approved_by,created_at,updated_at&limit=1`
  );

  if (!response.ok) {
    return supabaseError(response, "Failed to look up the manager member in Supabase");
  }

  const members = await response.json();
  return {
    ok: true,
    member: Array.isArray(members) ? members[0] ?? null : null,
  };
}

async function createManagerMember(supabase, member) {
  const response = await supabaseRequest(supabase, "/manager_members", {
    method: "POST",
    headers: {
      Prefer: "return=representation",
    },
    body: JSON.stringify(member),
  });

  if (!response.ok) {
    return supabaseError(response, "Failed to create the manager member in Supabase");
  }

  const members = await response.json();
  return {
    ok: true,
    member: Array.isArray(members) ? members[0] ?? null : members,
  };
}

async function updateManagerMemberById(supabase, memberId, patch) {
  const response = await supabaseRequest(supabase, `/manager_members?id=eq.${encodeURIComponent(memberId)}`, {
    method: "PATCH",
    headers: {
      Prefer: "return=representation",
    },
    body: JSON.stringify(patch),
  });

  if (!response.ok) {
    return supabaseError(response, "Failed to update the manager member in Supabase");
  }

  const members = await response.json();
  return {
    ok: true,
    member: Array.isArray(members) ? members[0] ?? null : members,
  };
}

function isBootstrapManagerOwner(claims, env) {
  const auth0Sub = normalizeSupabaseText(claims?.sub);
  const ownerSubs = typeof env?.MANAGER_OWNER_AUTH0_SUBS === "string" ? env.MANAGER_OWNER_AUTH0_SUBS : "";
  return ownerSubs
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .includes(auth0Sub);
}

function normalizeManagerRole(value) {
  const role = normalizeSupabaseText(value);
  return MANAGER_ROLES.includes(role) ? role : null;
}

function normalizeManagerStatus(value) {
  const status = normalizeSupabaseText(value);
  return MANAGER_STATUSES.includes(status) ? status : null;
}

function getManagerPermissions(role) {
  return MANAGER_ROLE_PERMISSIONS[role] ?? {};
}

function getDisplayNameFromClaims(claims) {
  return (
    normalizeSupabaseText(claims?.name) ||
    normalizeSupabaseText(claims?.nickname) ||
    normalizeSupabaseText(claims?.email) ||
    normalizeSupabaseText(claims?.sub) ||
    "Auth0 User"
  );
}

function normalizeSupabaseText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeEducationCode(value) {
  if (value === null || value === undefined) {
    return "";
  }
  return String(value).normalize("NFKC").trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 32);
}

function parseEducationCodes(env) {
  const map = new Map();
  const rawConfigs = getEducationCodeRawConfigs(env);
  if (rawConfigs.length === 0) {
    return map;
  }

  rawConfigs.forEach((rawConfig) => {
    addEducationCodeConfig(map, rawConfig);
  });
  return map;
}

function getEducationCodeRawConfigs(env) {
  return ["EDUCATION_CODES", "EDUCATION_CODE", "EDUCATION_CODE_LIST", "SCHOOL_CODES", "SCHOOL_CODE"]
    .map((key) => (typeof env?.[key] === "string" ? env[key].trim() : ""))
    .filter(Boolean);
}

function addEducationCodeConfig(map, rawConfig) {
  try {
    const parsed = JSON.parse(rawConfig);
    if (typeof parsed === "string") {
      addEducationCodeEntriesFromText(map, parsed);
      return;
    }
    if (typeof parsed === "number") {
      addEducationCodeEntry(map, parsed, "", "");
      return;
    }
    if (Array.isArray(parsed)) {
      parsed.forEach((entry) => {
        if (typeof entry === "string" || typeof entry === "number") {
          addEducationCodeEntry(map, entry, "", "");
          return;
        }
        addEducationCodeEntry(map, entry?.code, entry?.schoolName ?? entry?.school_name, entry?.message);
      });
      return;
    }
    if (parsed && typeof parsed === "object") {
      const codeList = Array.isArray(parsed.codes)
        ? parsed.codes
        : Array.isArray(parsed.educationCodes)
          ? parsed.educationCodes
          : null;
      if (codeList) {
        codeList.forEach((entry) => {
          if (typeof entry === "string" || typeof entry === "number") {
            addEducationCodeEntry(map, entry, "", "");
            return;
          }
          addEducationCodeEntry(map, entry?.code, entry?.schoolName ?? entry?.school_name, entry?.message);
        });
      }
      Object.entries(parsed).forEach(([code, entry]) => {
        if (code === "codes" || code === "educationCodes") {
          return;
        }
        if (typeof entry === "string") {
          addEducationCodeEntry(map, code, entry, "");
          return;
        }
        addEducationCodeEntry(map, code, entry?.schoolName ?? entry?.school_name, entry?.message);
      });
      return;
    }
  } catch {
    addEducationCodeEntriesFromText(map, rawConfig);
  }
}

function addEducationCodeEntriesFromText(map, value) {
  const text = normalizeSupabaseText(value);
  if (!text) {
    return;
  }
  const entries = text.includes("|") ? text.split(/[;\n]/) : text.split(/[,\s;\n]+/);
  entries.forEach((entry) => {
    const [code, schoolName = "", message = ""] = entry.split("|").map((part) => part.trim());
    addEducationCodeEntry(map, code, schoolName, message);
  });
}

function addEducationCodeEntry(map, code, schoolName, message) {
  const normalizedCode = normalizeEducationCode(code);
  if (!normalizedCode) {
    return;
  }
  map.set(normalizedCode, {
    schoolName: normalizeSupabaseText(schoolName),
    message: normalizeSupabaseText(message),
  });
}

async function readJsonBody(request) {
  try {
    return {
      ok: true,
      value: await request.json(),
    };
  } catch {
    return {
      ok: false,
      value: null,
    };
  }
}

async function verifyAuth0Jwt(token, auth0) {
  const parts = String(token).split(".");
  if (parts.length !== 3) {
    throw new Error("JWT must have three parts");
  }

  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  const header = decodeJwtJson(encodedHeader);
  const payload = decodeJwtJson(encodedPayload);

  if (header.alg !== "RS256") {
    throw new Error("JWT alg must be RS256");
  }
  if (!header.kid) {
    throw new Error("JWT kid is missing");
  }

  const jwk = await getAuth0Jwk(auth0, header.kid);
  const publicKey = await crypto.subtle.importKey(
    "jwk",
    jwk,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    false,
    ["verify"]
  );

  const isValidSignature = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    publicKey,
    decodeBase64UrlBytes(encodedSignature),
    new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`)
  );
  if (!isValidSignature) {
    throw new Error("JWT signature is invalid");
  }

  validateAuth0Claims(payload, auth0);
  return payload;
}

function validateAuth0Claims(payload, auth0) {
  const now = Math.floor(Date.now() / 1000);

  if (typeof payload.exp !== "number" || payload.exp <= now) {
    throw new Error("JWT is expired");
  }
  if (payload.iss !== auth0.issuer) {
    throw new Error("JWT issuer is invalid");
  }
  if (!jwtAudienceMatches(payload.aud, auth0.audience)) {
    throw new Error("JWT audience is invalid");
  }
  if (!normalizeSupabaseText(payload.sub)) {
    throw new Error("JWT sub is missing");
  }
}

function jwtAudienceMatches(audClaim, expectedAudience) {
  if (typeof audClaim === "string") {
    return audClaim === expectedAudience;
  }
  if (Array.isArray(audClaim)) {
    return audClaim.includes(expectedAudience);
  }
  return false;
}

async function getAuth0Jwk(auth0, kid) {
  let jwks = await getAuth0Jwks(auth0);
  let jwk = jwks.find((key) => key.kid === kid);
  if (jwk) {
    return jwk;
  }

  auth0JwksCache.delete(auth0.domain);
  jwks = await getAuth0Jwks(auth0);
  jwk = jwks.find((key) => key.kid === kid);
  if (!jwk) {
    throw new Error("No matching Auth0 JWKS key was found");
  }
  return jwk;
}

async function getAuth0Jwks(auth0) {
  const cached = auth0JwksCache.get(auth0.domain);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.keys;
  }

  const response = await fetch(auth0.jwksUrl, {
    headers: {
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch Auth0 JWKS: ${response.status}`);
  }

  const jwks = await response.json();
  const keys = Array.isArray(jwks?.keys) ? jwks.keys : [];
  if (keys.length === 0) {
    throw new Error("Auth0 JWKS did not include any keys");
  }

  auth0JwksCache.set(auth0.domain, {
    keys,
    expiresAt: Date.now() + AUTH0_JWKS_CACHE_TTL_MS,
  });
  return keys;
}

function decodeJwtJson(value) {
  return JSON.parse(new TextDecoder().decode(decodeBase64UrlBytes(value)));
}

function decodeBase64UrlBytes(value) {
  const base64 = String(value).replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

async function supabaseRequest(supabase, path, init = {}) {
  const headers = {
    apikey: supabase.serviceRoleKey,
    Authorization: `Bearer ${supabase.serviceRoleKey}`,
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(init.headers ?? {}),
  };

  return fetch(`${supabase.url}/rest/v1${path}`, {
    ...init,
    headers,
  });
}

async function supabaseError(response, fallbackMessage) {
  let body = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  return {
    ok: false,
    status: response.status,
    body: {
      error: fallbackMessage,
      status: response.status,
      details: body,
    },
  };
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(),
    },
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}
