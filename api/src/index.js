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
      return json(getFallbackQuestions());
    }

    if (pathname === "/me" && ["GET", "POST", "PATCH"].includes(request.method)) {
      return upsertCurrentReviewAccount(request, env);
    }

    if (pathname === "/me/review-data" && request.method === "GET") {
      return getCurrentReviewData(request, env);
    }

    if (pathname === "/me/review-data" && ["POST", "PUT", "PATCH"].includes(request.method)) {
      return saveCurrentReviewData(request, env);
    }

    if (pathname === "/me/review-data" && request.method === "DELETE") {
      return deleteCurrentReviewData(request, env);
    }

    if (pathname === "/education-codes/validate" && request.method === "POST") {
      return validateEducationCode(request, env);
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
    if (managerMemberMatch && request.method === "DELETE") {
      return deleteManagerMember(request, env, managerMemberMatch[1]);
    }

    return json({ error: "Not Found", path: url.pathname }, 404);
  }
};

const AUTH0_JWKS_CACHE_TTL_MS = 5 * 60 * 1000;
const auth0JwksCache = new Map();
const REVIEW_DATA_STORAGE_KEY = "the-review-quest-v1";
const REVIEW_DATA_MAX_PAYLOAD_BYTES = 750 * 1024;
const USER_SELECT_FIELDS = [
  "id",
  "auth0_sub",
  "nickname",
  "email",
  "personal_data",
  "review_period",
  "todays_mission",
  "review_data",
  "login_status",
  "is_logged_in",
  "auth_provider",
  "color_theme",
  "review_coin",
  "has_unlimited_review_coins",
  "settings",
  "education_codes",
  "avater",
  "review_client_updated_at",
  "review_synced_at",
  "review_remote_updated_at",
  "manager_role",
  "manager_status",
  "manager_approved_at",
  "manager_approved_by",
  "created_at",
  "updated_at",
].join(",");

const MANAGER_USER_ROLE = "user";
const MANAGER_ROLES = ["owner", "developer", "checker", "system_designer", "character_designer"];
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

  const memberResult = await getOrCreateManagerMember(context.supabase, context.user, context.claims, env);
  if (!memberResult.ok) {
    return json(memberResult.body, memberResult.status);
  }

  const member = memberResult.member;
  const role = normalizeManagerRole(member?.role);
  return json({
    canAccess: Boolean(role),
    status: role ? "member" : "user",
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
    canAccess: Boolean(role),
    status: role ? "member" : "user",
    member,
    permissions: getManagerPermissions(role),
  });
}

async function listManagerMembers(request, env) {
  const access = await requireManagerOwner(request, env);
  if (!access.ok) {
    return json(access.body, access.status);
  }

  const response = await supabaseRequest(access.supabase, `/users?select=${USER_SELECT_FIELDS}&order=created_at.desc`);
  if (!response.ok) {
    const error = await supabaseError(response, "Failed to list manager members");
    return json(error.body, error.status);
  }

  const users = await response.json();
  return json(Array.isArray(users) ? users.map(serializeManagerMemberRow) : []);
}

async function updateManagerMember(request, env, memberId) {
  const access = await requireManagerOwner(request, env);
  if (!access.ok) {
    return json(access.body, access.status);
  }

  const normalizedMemberId = normalizeSupabaseText(memberId);
  if (!normalizedMemberId) {
    return json({ error: "member id is required" }, 400);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const currentResponse = await supabaseRequest(
    access.supabase,
    `/users?id=eq.${encodeURIComponent(normalizedMemberId)}&select=${USER_SELECT_FIELDS}&limit=1`
  );
  if (!currentResponse.ok) {
    const error = await supabaseError(currentResponse, "Failed to look up manager member");
    return json(error.body, error.status);
  }
  const currentUsers = await currentResponse.json();
  const currentUser = Array.isArray(currentUsers) ? currentUsers[0] ?? null : null;
  if (!currentUser) {
    return json({ error: "User not found" }, 404);
  }

  const settingsPatch = readOptionalManagerJsonObjectPatch(body, ["settings"], "settings");
  if (!settingsPatch.ok) {
    return json({ error: settingsPatch.error }, 400);
  }
  const avaterPatch = readOptionalManagerJsonObjectPatch(body, ["avater", "avatar"], "avater");
  if (!avaterPatch.ok) {
    return json({ error: avaterPatch.error }, 400);
  }
  const reviewDataPatch = readOptionalManagerJsonObjectPatch(body, ["reviewData", "review_data"], "reviewData");
  if (!reviewDataPatch.ok) {
    return json({ error: reviewDataPatch.error }, 400);
  }

  const hasRolePatch = Object.prototype.hasOwnProperty.call(body, "role");
  const roleText = normalizeSupabaseText(body?.role);
  const role = normalizeManagerRole(body?.role);
  const isUserRole = roleText === MANAGER_USER_ROLE;
  const now = toJstIsoString();
  const patch = {
    updated_at: now,
  };
  const personalData = { ...normalizeJsonObject(currentUser.personal_data) };
  const authData = { ...normalizeJsonObject(personalData.auth) };
  const currentReviewPeriod = normalizeJsonObject(currentUser.review_period);
  let settingsData = {
    ...normalizeJsonObject(
      settingsPatch.has ? settingsPatch.value : pickFirstNonEmptyJsonObject(currentUser.settings, personalData.settings)
    ),
  };
  let shouldPatchPersonalData = false;
  let shouldPatchSettings = settingsPatch.has;
  let shouldPatchAuth = false;
  const setPersonalDataField = (key, value) => {
    personalData[key] = value;
    shouldPatchPersonalData = true;
  };

  if (hasRolePatch && isUserRole) {
    patch.manager_role = null;
    patch.manager_status = "pending";
    patch.manager_approved_at = null;
    patch.manager_approved_by = null;
  } else if (hasRolePatch && role) {
    patch.manager_role = role;
    patch.manager_status = "approved";
    patch.manager_approved_at = now;
    patch.manager_approved_by = access.member?.id ?? null;
  }
  if (hasRolePatch && !role && !isUserRole) {
    return json({ error: "role is required" }, 400);
  }
  let hasReviewDataPatch = false;
  if (Object.prototype.hasOwnProperty.call(body, "reviewCoin")) {
    const reviewCoin = normalizeNonNegativeInteger(body.reviewCoin, 0);
    patch.review_coin = reviewCoin;
    setPersonalDataField("reviewCoin", reviewCoin);
    hasReviewDataPatch = true;
  }
  if (Object.prototype.hasOwnProperty.call(body, "hasUnlimitedReviewCoins")) {
    const hasUnlimitedReviewCoins = Boolean(body.hasUnlimitedReviewCoins);
    patch.has_unlimited_review_coins = hasUnlimitedReviewCoins;
    setPersonalDataField("hasUnlimitedReviewCoins", hasUnlimitedReviewCoins);
    hasReviewDataPatch = true;
  }
  if (Object.prototype.hasOwnProperty.call(body, "reviewDays")) {
    const loginDays = createRecentLoginDaysRecord(normalizeNonNegativeInteger(body.reviewDays, 0));
    const dailyLoginRewardDays = normalizeJsonObject(currentReviewPeriod.dailyLoginRewardDays ?? personalData.dailyLoginRewardDays);
    patch.review_period = {
      loginDays,
      dailyLoginRewardDays,
    };
    setPersonalDataField("loginDays", loginDays);
    setPersonalDataField("dailyLoginRewardDays", dailyLoginRewardDays);
    hasReviewDataPatch = true;
  }
  if (Object.prototype.hasOwnProperty.call(body, "nickname")) {
    const nickname = normalizeSupabaseText(body.nickname) || null;
    patch.nickname = nickname;
    authData.nickname = nickname || "";
    authData.displayName = nickname || "";
    shouldPatchAuth = true;
  }
  if (Object.prototype.hasOwnProperty.call(body, "email")) {
    patch.email = normalizeSupabaseText(body.email) || null;
    authData.email = patch.email;
    shouldPatchAuth = true;
  }
  if (Object.prototype.hasOwnProperty.call(body, "loginStatus")) {
    const loginStatus = normalizeManagerLoginStatus(body.loginStatus);
    const currentProvider = normalizeSupabaseText(currentUser.auth_provider) || normalizeSupabaseText(authData.provider);
    patch.login_status = loginStatus;
    patch.is_logged_in = loginStatus !== "logged_out";
    if (loginStatus === "guest") {
      patch.auth_provider = "guest";
    } else if (loginStatus === "logged_in") {
      patch.auth_provider = currentProvider && currentProvider !== "guest" ? currentProvider : "auth0";
    } else {
      patch.auth_provider = null;
    }
    authData.isLoggedIn = patch.is_logged_in;
    authData.provider = patch.auth_provider;
    shouldPatchAuth = true;
  }
  if (Object.prototype.hasOwnProperty.call(body, "educationCodes")) {
    const educationCodes = normalizeManagerEducationCodes(body.educationCodes);
    patch.education_codes = educationCodes;
    settingsData.educationCodes = educationCodes;
    shouldPatchSettings = true;
    hasReviewDataPatch = true;
  }
  if (Object.prototype.hasOwnProperty.call(body, "colorTheme")) {
    const colorTheme = normalizeSupabaseText(body.colorTheme) || null;
    patch.color_theme = colorTheme;
    settingsData.theme = colorTheme || "";
    shouldPatchSettings = true;
    hasReviewDataPatch = true;
  }
  if (shouldPatchSettings) {
    patch.settings = settingsData;
    setPersonalDataField("settings", settingsData);
    hasReviewDataPatch = true;
  }
  if (avaterPatch.has) {
    patch.avater = normalizeAvaterForSupabase(avaterPatch.value);
    setPersonalDataField("avater", patch.avater);
    hasReviewDataPatch = true;
  }
  if (reviewDataPatch.has) {
    patch.review_data = reviewDataPatch.value;
    setPersonalDataField("learningProgress", patch.review_data);
    hasReviewDataPatch = true;
  }
  if (shouldPatchAuth) {
    setPersonalDataField("auth", authData);
  }
  if (shouldPatchPersonalData) {
    patch.personal_data = personalData;
  }
  if (hasReviewDataPatch || shouldPatchPersonalData) {
    patch.review_remote_updated_at = now;
    patch.review_synced_at = now;
  }
  if (Object.keys(patch).length === 1) {
    return json({ error: "no fields to update" }, 400);
  }

  const response = await supabaseRequest(access.supabase, `/users?id=eq.${encodeURIComponent(normalizedMemberId)}`, {
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

  const users = await response.json();
  const user = Array.isArray(users) ? users[0] ?? null : users;
  return json(serializeManagerMemberRow(user));
}

async function deleteManagerMember(request, env, memberId) {
  const access = await requireManagerOwner(request, env);
  if (!access.ok) {
    return json(access.body, access.status);
  }

  const normalizedMemberId = normalizeSupabaseText(memberId);
  if (!normalizedMemberId) {
    return json({ error: "member id is required" }, 400);
  }

  const response = await supabaseRequest(access.supabase, `/users?id=eq.${encodeURIComponent(normalizedMemberId)}`, {
    method: "DELETE",
    headers: {
      Prefer: "return=representation",
    },
  });
  if (!response.ok) {
    const error = await supabaseError(response, "Failed to delete manager member");
    return json(error.body, error.status);
  }

  const users = await response.json().catch(() => []);
  const deletedUser = Array.isArray(users) ? users[0] ?? null : users;
  return json({
    deleted: true,
    member: serializeManagerMemberRow(deletedUser),
  });
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

  if (memberResult.member?.role !== "owner") {
    return {
      ok: false,
      status: 403,
      body: {
        error: "Only owners can manage The Review Manager members.",
      },
    };
  }

  return {
    ok: true,
    ...context,
    member: memberResult.member,
  };
}

async function requireManagerPermission(request, env, permissions = []) {
  const context = await getAuthenticatedSupabaseContext(request, env);
  if (!context.ok) {
    return context;
  }

  const memberResult = await getOrCreateManagerMember(context.supabase, context.user, context.claims, env);
  if (!memberResult.ok) {
    return memberResult;
  }

  const role = normalizeManagerRole(memberResult.member?.role);
  const rolePermissions = getManagerPermissions(role);
  const allowed = role === "owner" || permissions.some((permission) => rolePermissions[permission]);
  if (!allowed) {
    return {
      ok: false,
      status: 403,
      body: {
        error: "The Review Manager permission is required.",
      },
    };
  }

  return {
    ok: true,
    ...context,
    member: memberResult.member,
    permissions: rolePermissions,
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
  const hasEmailPatch = request.method !== "GET" && Object.prototype.hasOwnProperty.call(payload, "email");
  const nickname = normalizeSupabaseText(payload.nickname);
  const emailPatch = normalizeSupabaseText(payload.email) || null;
  const displayName = hasNicknamePatch && nickname ? nickname : normalizeSupabaseText(context.user?.nickname);
  const patch = {};
  if (hasNicknamePatch && nickname && nickname !== context.user?.nickname) {
    patch.nickname = nickname;
  }
  if (hasEmailPatch && emailPatch !== (context.user?.email ?? null)) {
    patch.email = emailPatch;
  }
  if (Object.keys(patch).length > 0) {
    patch.updated_at = toJstIsoString();
  }
  let user = context.user;
  if (user?.id && Object.keys(patch).length > 0) {
    const updatedUser = await updateUserById(context.supabase, user.id, patch);
    if (updatedUser.ok && updatedUser.user) {
      user = updatedUser.user;
    }
  }

  const managerProfile = {
    displayName,
    updateDisplayName: hasNicknamePatch && Boolean(nickname),
  };
  if (hasEmailPatch) {
    managerProfile.email = emailPatch;
  }
  const memberResult = await getOrCreateManagerMember(context.supabase, user, context.claims, env, managerProfile);
  if (!memberResult.ok) {
    return json(memberResult.body, memberResult.status);
  }

  return json({
    user,
    managerMember: memberResult.member,
    isNewReviewAccount: Boolean(context.userCreated),
  });
}

async function getCurrentReviewData(request, env) {
  const context = await getAuthenticatedSupabaseContext(request, env);
  if (!context.ok) {
    return json(context.body, context.status);
  }

  const reviewDataResult = await getReviewDataByUserId(context.supabase, context.user?.id);
  if (!reviewDataResult.ok) {
    return json(reviewDataResult.body, reviewDataResult.status);
  }

  return json({
    reviewData: reviewDataResult.reviewData ? serializeReviewDataRow(reviewDataResult.reviewData) : null,
  });
}

async function saveCurrentReviewData(request, env) {
  const context = await getAuthenticatedSupabaseContext(request, env);
  if (!context.ok) {
    return json(context.body, context.status);
  }

  const bodyResult = await readJsonBody(request);
  if (!bodyResult.ok) {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const payloadResult = normalizeReviewDataPayload(bodyResult.value);
  if (!payloadResult.ok) {
    return json(
      {
        error: "Invalid Review Data payload",
        details: payloadResult.errors,
      },
      400
    );
  }

  const existingResult = await getReviewDataByUserId(context.supabase, context.user?.id);
  if (!existingResult.ok) {
    return json(existingResult.body, existingResult.status);
  }
  if (existingResult.reviewData) {
    const existingClientUpdatedAt = parseSupabaseTimestamp(existingResult.reviewData.review_client_updated_at);
    const existingRemoteUpdatedAt = parseSupabaseTimestamp(existingResult.reviewData.review_remote_updated_at);
    const existingReviewUpdatedAt = Math.max(existingClientUpdatedAt, existingRemoteUpdatedAt);
    const incomingLastRemoteUpdatedAt = parseSupabaseTimestamp(payloadResult.value.payload?.sync?.lastRemoteUpdatedAt);
    const incomingUpdatedAt = Date.parse(payloadResult.value.client_updated_at);
    const remoteChangedAfterClientLastPull = existingRemoteUpdatedAt > 0 && existingRemoteUpdatedAt > incomingLastRemoteUpdatedAt;
    const remoteIsNewerThanIncoming =
      existingReviewUpdatedAt > 0 && Number.isFinite(incomingUpdatedAt) && existingReviewUpdatedAt > incomingUpdatedAt;
    if (remoteChangedAfterClientLastPull || remoteIsNewerThanIncoming) {
      return json(
        {
          error: "A newer Review Data snapshot already exists.",
          conflict: true,
          reviewData: serializeReviewDataRow(existingResult.reviewData),
        },
        409
      );
    }
  }

  const savedResult = await upsertReviewData(context.supabase, {
    user_id: context.user.id,
    storage_key: payloadResult.value.storage_key,
    payload: payloadResult.value.payload,
    client_updated_at: payloadResult.value.client_updated_at,
    ...extractReviewDataColumns(payloadResult.value.payload),
  });
  if (!savedResult.ok) {
    return json(savedResult.body, savedResult.status);
  }

  return json({
    reviewData: serializeReviewDataRow(savedResult.reviewData),
  });
}

async function deleteCurrentReviewData(request, env) {
  const context = await getAuthenticatedSupabaseContext(request, env);
  if (!context.ok) {
    return json(context.body, context.status);
  }

  const deleteResult = await deleteReviewDataByUserId(context.supabase, context.user?.id);
  if (!deleteResult.ok) {
    return json(deleteResult.body, deleteResult.status);
  }

  return json({ ok: true });
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

function normalizeReviewDataPayload(body) {
  const errors = [];
  const storageKey = normalizeSupabaseText(body?.storageKey ?? body?.storage_key) || REVIEW_DATA_STORAGE_KEY;
  const payload = body?.data ?? body?.payload;
  const clientUpdatedAt = normalizeIsoTimestamp(body?.clientUpdatedAt ?? body?.client_updated_at) || toJstIsoString();

  if (storageKey !== REVIEW_DATA_STORAGE_KEY) {
    errors.push("storageKey is invalid");
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    errors.push("data must be an object");
  } else {
    const payloadBytes = new TextEncoder().encode(JSON.stringify(payload)).length;
    if (payloadBytes > REVIEW_DATA_MAX_PAYLOAD_BYTES) {
      errors.push("data is too large");
    }
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
      storage_key: storageKey,
      payload,
      client_updated_at: clientUpdatedAt,
    },
  };
}

function extractReviewDataColumns(payload) {
  const data = normalizeJsonObject(payload);
  const columns = {};
  columns.personal_data = data;
  if (Object.prototype.hasOwnProperty.call(data, "dailyTryRecords")) {
    columns.todays_mission = normalizeJsonObject(data.dailyTryRecords);
  }
  if (
    Object.prototype.hasOwnProperty.call(data, "learningProgress") ||
    Object.prototype.hasOwnProperty.call(data, "progress") ||
    Object.prototype.hasOwnProperty.call(data, "noteProgress")
  ) {
    columns.review_data = normalizeJsonObject(data.learningProgress ?? data.progress ?? data.noteProgress);
  }
  if (
    Object.prototype.hasOwnProperty.call(data, "loginDays") ||
    Object.prototype.hasOwnProperty.call(data, "dailyLoginRewardDays")
  ) {
    columns.review_period = {
      loginDays: normalizeJsonObject(data.loginDays),
      dailyLoginRewardDays: normalizeJsonObject(data.dailyLoginRewardDays),
    };
  }
  if (reviewDataPayloadIncludesPersonalColumns(data)) {
    Object.assign(columns, extractReviewPersonalColumns(data));
  }
  return columns;
}

function reviewDataPayloadIncludesPersonalColumns(data) {
  return ["reviewCoin", "hasUnlimitedReviewCoins", "settings", "auth", "avater", "avatar"].some((key) =>
    Object.prototype.hasOwnProperty.call(data, key)
  );
}

function extractReviewPersonalColumns(payload) {
  const data = normalizeJsonObject(payload);
  const settings = normalizeJsonObject(data.settings);
  const auth = normalizeJsonObject(data.auth);
  const avater = normalizeAvaterForSupabase(data.avater ?? data.avatar);
  const reviewSettings = normalizeReviewSettingsForSupabase(settings);
  const reviewCoin = Number(data.reviewCoin);
  const isLoggedIn = Boolean(auth.isLoggedIn);
  const provider = normalizeSupabaseText(auth.provider);
  const loginStatus = isLoggedIn ? (provider === "guest" ? "guest" : "logged_in") : "logged_out";

  return {
    login_status: loginStatus,
    is_logged_in: isLoggedIn,
    auth_provider: provider || null,
    nickname: normalizeSupabaseText(auth.nickname) || normalizeSupabaseText(auth.displayName) || null,
    email: normalizeSupabaseText(auth.email) || null,
    color_theme: normalizeSupabaseText(settings.theme) || null,
    review_coin: Number.isFinite(reviewCoin) && reviewCoin >= 0 ? Math.floor(reviewCoin) : 0,
    has_unlimited_review_coins: Boolean(data.hasUnlimitedReviewCoins),
    settings: reviewSettings,
    education_codes: Array.isArray(reviewSettings.educationCodes) ? reviewSettings.educationCodes : [],
    avater,
  };
}

function normalizeAvaterForSupabase(value) {
  const avater = normalizeJsonObject(value);
  if (Object.keys(avater).length === 0) {
    return {};
  }
  return {
    ...avater,
    equipped: normalizeJsonObject(avater.equipped),
  };
}

function normalizeReviewSettingsForSupabase(settings) {
  const normalized = normalizeJsonObject(settings);
  const sanitized = { ...normalized };
  delete sanitized.highContrast;
  delete sanitized.monochrome;
  delete sanitized.text;
  delete sanitized.notifications;
  delete sanitized.notificationTimeMinutes;
  delete sanitized.reviewPeriodNotifyMinutes;
  return sanitized;
}

function createDefaultReviewDataColumns() {
  return {
    personal_data: {},
    review_period: {},
    todays_mission: {},
    review_data: {},
    login_status: "logged_out",
    is_logged_in: false,
    auth_provider: null,
    nickname: null,
    color_theme: null,
    review_coin: 0,
    has_unlimited_review_coins: false,
    settings: {},
    education_codes: [],
    avater: {},
    review_client_updated_at: null,
    review_synced_at: null,
    review_remote_updated_at: null,
  };
}

function normalizeJsonObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function pickFirstNonEmptyJsonObject(...values) {
  const objects = values.map(normalizeJsonObject);
  return objects.find((object) => Object.keys(object).length > 0) || objects[0] || {};
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
    nickname: getDisplayNameFromClaims(claims),
    email: normalizeSupabaseText(claims?.email) || null,
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
    `/users?auth0_sub=eq.${encodeURIComponent(auth0Sub)}&select=${USER_SELECT_FIELDS}&limit=1`
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

async function getReviewDataByUserId(supabase, userId) {
  const normalizedUserId = normalizeSupabaseText(userId);
  if (!normalizedUserId) {
    return {
      ok: false,
      status: 500,
      body: {
        error: "Review Data could not be resolved because the user record has no id.",
      },
    };
  }

  const response = await supabaseRequest(
    supabase,
    `/users?id=eq.${encodeURIComponent(normalizedUserId)}&select=${USER_SELECT_FIELDS}&limit=1`
  );
  if (!response.ok) {
    return supabaseError(response, "Failed to look up Review Data on the Supabase user");
  }

  const rows = await response.json();
  const user = Array.isArray(rows) ? rows[0] ?? null : null;
  return {
    ok: true,
    reviewData: user,
  };
}

async function upsertReviewData(supabase, reviewData) {
  const now = toJstIsoString();
  const userId = normalizeSupabaseText(reviewData?.user_id);
  if (!userId) {
    return {
      ok: false,
      status: 500,
      body: {
        error: "Review Data could not be saved because the user record has no id.",
      },
    };
  }

  const {
    user_id: _userId,
    storage_key: _storageKey,
    payload,
    client_updated_at: clientUpdatedAt,
    ...columns
  } = reviewData;
  const patch = {
    ...columns,
    personal_data: normalizeJsonObject(payload),
    review_client_updated_at: normalizeIsoTimestamp(clientUpdatedAt),
    review_remote_updated_at: now,
    updated_at: now,
  };

  const response = await supabaseRequest(supabase, `/users?id=eq.${encodeURIComponent(userId)}`, {
    method: "PATCH",
    headers: {
      Prefer: "return=representation",
    },
    body: JSON.stringify(patch),
  });

  if (!response.ok) {
    return supabaseError(response, "Failed to save Review Data on the Supabase user");
  }

  const rows = await response.json();
  return {
    ok: true,
    reviewData: Array.isArray(rows) ? rows[0] ?? null : rows,
  };
}

async function deleteReviewDataByUserId(supabase, userId) {
  const normalizedUserId = normalizeSupabaseText(userId);
  if (!normalizedUserId) {
    return {
      ok: false,
      status: 500,
      body: {
        error: "Review Data could not be deleted because the user record has no id.",
      },
    };
  }

  const response = await supabaseRequest(supabase, `/users?id=eq.${encodeURIComponent(normalizedUserId)}`, {
    method: "PATCH",
    headers: {
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      ...createDefaultReviewDataColumns(),
      updated_at: toJstIsoString(),
    }),
  });

  if (!response.ok) {
    return supabaseError(response, "Failed to clear Review Data on the Supabase user");
  }

  return {
    ok: true,
  };
}

function serializeReviewDataRow(row) {
  if (!row) {
    return null;
  }
  const reviewPeriod = normalizeJsonObject(row.review_period);
  const data = { ...normalizeJsonObject(row.personal_data) };
  const loginDays = normalizeJsonObject(reviewPeriod.loginDays);
  const dailyLoginRewardDays = normalizeJsonObject(reviewPeriod.dailyLoginRewardDays);
  const dailyTryRecords = normalizeJsonObject(row.todays_mission);
  const learningProgress = normalizeJsonObject(row.review_data);
  const settings = normalizeJsonObject(row.settings);
  const educationCodes = Array.isArray(row.education_codes) ? row.education_codes : [];
  const avater = normalizeAvaterForSupabase(row.avater);
  const equippedAvater = normalizeJsonObject(avater.equipped);
  const reviewCoin = Number.isFinite(Number(row.review_coin)) ? Number(row.review_coin) : 0;
  const auth = normalizeJsonObject(data.auth);
  const existingLearningProgress = normalizeJsonObject(data.learningProgress ?? data.progress ?? data.noteProgress);
  const existingAvater = normalizeJsonObject(data.avater ?? data.avatar);

  data.loginDays = Object.keys(loginDays).length > 0 || !data.loginDays ? loginDays : normalizeJsonObject(data.loginDays);
  data.dailyLoginRewardDays =
    Object.keys(dailyLoginRewardDays).length > 0 || !data.dailyLoginRewardDays
      ? dailyLoginRewardDays
      : normalizeJsonObject(data.dailyLoginRewardDays);
  data.dailyTryRecords =
    Object.keys(dailyTryRecords).length > 0 || !data.dailyTryRecords
      ? dailyTryRecords
      : normalizeJsonObject(data.dailyTryRecords);
  data.learningProgress =
    Object.keys(learningProgress).length > 0 || Object.keys(existingLearningProgress).length === 0
      ? learningProgress
      : existingLearningProgress;
  data.reviewCoin = reviewCoin;
  data.hasUnlimitedReviewCoins = Boolean(row.has_unlimited_review_coins);
  data.settings = {
    ...normalizeJsonObject(data.settings),
    ...settings,
  };
  if (educationCodes.length > 0) {
    data.settings.educationCodes = educationCodes;
  }
  data.auth = {
    ...auth,
    isLoggedIn: Boolean(row.is_logged_in || auth.isLoggedIn),
    provider: row.auth_provider || auth.provider || null,
    displayName: row.nickname || auth.displayName || "Guest Mode",
    nickname: row.nickname || auth.nickname || "",
    email: row.email || auth.email || null,
  };
  if (Object.keys(avater).length > 0 || Object.keys(existingAvater).length === 0) {
    data.avater = {
      ...avater,
      equipped: Object.keys(equippedAvater).length > 0 ? equippedAvater : normalizeJsonObject(avater.equipped),
    };
  } else {
    data.avater = {
      ...existingAvater,
      equipped:
        Object.keys(equippedAvater).length > 0 ? equippedAvater : normalizeJsonObject(existingAvater.equipped),
    };
  }
  return {
    storageKey: REVIEW_DATA_STORAGE_KEY,
    data,
    loginDays,
    dailyLoginRewardDays,
    dailyTryRecords,
    learningProgress,
    loginStatus: row.login_status || null,
    isLoggedIn: Boolean(row.is_logged_in),
    authProvider: row.auth_provider || null,
    displayName: row.nickname || null,
    nickname: row.nickname || null,
    email: row.email || null,
    colorTheme: row.color_theme || null,
    reviewCoin,
    hasUnlimitedReviewCoins: Boolean(row.has_unlimited_review_coins),
    settings,
    educationCodes,
    avater,
    equippedAvater,
    clientUpdatedAt: row.review_client_updated_at || null,
    updatedAt: row.review_remote_updated_at || row.updated_at || null,
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
  const existingByAuth0Sub = auth0Sub
    ? await getManagerMemberByAuth0Sub(supabase, auth0Sub)
    : { ok: true, member: null };
  if (!existingByAuth0Sub.ok) {
    return existingByAuth0Sub;
  }

  const existingByUserId = await getManagerMemberByUserId(supabase, user.id);
  if (!existingByUserId.ok) {
    return existingByUserId;
  }
  const hasSeparateUserMember =
    Boolean(existingByAuth0Sub.member && existingByUserId.member) &&
    existingByAuth0Sub.member.id !== existingByUserId.member.id;
  const existing = existingByAuth0Sub.member ? existingByAuth0Sub : existingByUserId;

  const shouldBootstrapOwner = isBootstrapManagerOwner(claims, env);
  const profileDisplayName = normalizeSupabaseText(profile?.displayName);
  const shouldUpdateDisplayName = Boolean(profile?.updateDisplayName && profileDisplayName);
  const displayName =
    profileDisplayName || normalizeSupabaseText(user?.nickname) || getDisplayNameFromClaims(claims);
  const hasProfileEmail = Object.prototype.hasOwnProperty.call(profile || {}, "email");
  const email = hasProfileEmail
    ? normalizeSupabaseText(profile.email) || null
    : normalizeSupabaseText(claims?.email) || null;
  if (existing.member) {
    const patch = {};
    if (auth0Sub && existing.member.auth0_sub !== auth0Sub) {
      patch.auth0_sub = auth0Sub;
    }
    if (
      displayName &&
      (!existing.member.display_name || (shouldUpdateDisplayName && displayName !== existing.member.display_name))
    ) {
      patch.nickname = displayName;
    }
    if (email !== (existing.member.email ?? null)) {
      patch.email = email;
    }
    if (shouldBootstrapOwner && (existing.member.role !== "owner" || existing.member.status !== "approved")) {
      Object.assign(patch, {
        manager_role: "owner",
        manager_status: "approved",
        manager_approved_at: toJstIsoString(),
      });
    }
    if (Object.keys(patch).length > 0) {
      patch.updated_at = toJstIsoString();
      return updateManagerMemberById(supabase, existing.member.id, patch);
    }
    return existing;
  }

  return createManagerMember(supabase, {
    user_id: user.id,
    auth0_sub: auth0Sub,
    nickname: displayName,
    email,
    role: shouldBootstrapOwner ? "owner" : null,
    status: shouldBootstrapOwner ? "approved" : "pending",
    approved_at: shouldBootstrapOwner ? toJstIsoString() : null,
  });
}

async function getManagerMemberByUserId(supabase, userId) {
  const response = await supabaseRequest(
    supabase,
    `/users?id=eq.${encodeURIComponent(userId)}&select=${USER_SELECT_FIELDS}&limit=1`
  );

  if (!response.ok) {
    return supabaseError(response, "Failed to look up the manager member on the Supabase user");
  }

  const users = await response.json();
  const user = Array.isArray(users) ? users[0] ?? null : null;
  return {
    ok: true,
    member: serializeManagerMemberRow(user),
  };
}

async function getManagerMemberByAuth0Sub(supabase, auth0Sub) {
  const response = await supabaseRequest(
    supabase,
    `/users?auth0_sub=eq.${encodeURIComponent(auth0Sub)}&select=${USER_SELECT_FIELDS}&limit=1`
  );

  if (!response.ok) {
    return supabaseError(response, "Failed to look up the manager member on the Supabase user");
  }

  const users = await response.json();
  const user = Array.isArray(users) ? users[0] ?? null : null;
  return {
    ok: true,
    member: serializeManagerMemberRow(user),
  };
}

async function createManagerMember(supabase, member) {
  const userId = normalizeSupabaseText(member?.user_id);
  if (!userId) {
    return {
      ok: false,
      status: 500,
      body: {
        error: "Manager member could not be created because the user record has no id.",
      },
    };
  }

  const response = await supabaseRequest(supabase, `/users?id=eq.${encodeURIComponent(userId)}`, {
    method: "PATCH",
    headers: {
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      auth0_sub: member.auth0_sub || null,
      nickname: member.nickname || member.display_name || null,
      email: member.email || null,
      manager_role: normalizeManagerRole(member.role),
      manager_status: normalizeSupabaseText(member.status) || "pending",
      manager_approved_at: member.approved_at || null,
      updated_at: toJstIsoString(),
    }),
  });

  if (!response.ok) {
    return supabaseError(response, "Failed to create the manager member on the Supabase user");
  }

  const users = await response.json();
  const user = Array.isArray(users) ? users[0] ?? null : users;
  return {
    ok: true,
    member: serializeManagerMemberRow(user),
  };
}

async function updateManagerMemberById(supabase, memberId, patch) {
  const response = await supabaseRequest(supabase, `/users?id=eq.${encodeURIComponent(memberId)}`, {
    method: "PATCH",
    headers: {
      Prefer: "return=representation",
    },
    body: JSON.stringify(patch),
  });

  if (!response.ok) {
    return supabaseError(response, "Failed to update the manager member on the Supabase user");
  }

  const users = await response.json();
  const user = Array.isArray(users) ? users[0] ?? null : users;
  return {
    ok: true,
    member: serializeManagerMemberRow(user),
  };
}

function serializeManagerMemberRow(user) {
  if (!user) {
    return null;
  }
  const personalData = normalizeJsonObject(user.personal_data);
  const reviewPeriod = normalizeJsonObject(user.review_period);
  const loginDays = normalizeJsonObject(reviewPeriod.loginDays ?? personalData.loginDays);
  const dailyLoginRewardDays = normalizeJsonObject(reviewPeriod.dailyLoginRewardDays ?? personalData.dailyLoginRewardDays);
  const settings = pickFirstNonEmptyJsonObject(user.settings, personalData.settings);
  const avater = normalizeAvaterForSupabase(pickFirstNonEmptyJsonObject(user.avater, personalData.avater, personalData.avatar));
  const equippedAvater = normalizeJsonObject(avater.equipped);
  const reviewData = pickFirstNonEmptyJsonObject(
    user.review_data,
    personalData.learningProgress,
    personalData.progress,
    personalData.noteProgress
  );
  const reviewCoin = Number.isFinite(Number(user.review_coin)) ? Number(user.review_coin) : 0;
  return {
    id: user.id || "",
    user_id: user.id || "",
    auth0_sub: user.auth0_sub || "",
    display_name: user.nickname || "",
    nickname: user.nickname || "",
    email: user.email || null,
    loginStatus: user.login_status || null,
    isLoggedIn: Boolean(user.is_logged_in),
    authProvider: user.auth_provider || null,
    colorTheme: user.color_theme || null,
    role: normalizeManagerRole(user.manager_role),
    status: normalizeSupabaseText(user.manager_status) || "pending",
    reviewCoin: reviewCoin >= 0 ? Math.floor(reviewCoin) : 0,
    hasUnlimitedReviewCoins: Boolean(user.has_unlimited_review_coins),
    reviewDays: Object.keys(loginDays).length,
    loginDays,
    dailyLoginRewardDays,
    settings,
    educationCodes: Array.isArray(user.education_codes) ? user.education_codes : [],
    avater: {
      ...avater,
      equipped: equippedAvater,
    },
    equippedAvater,
    reviewData,
    approved_at: user.manager_approved_at || null,
    approved_by: user.manager_approved_by || null,
    created_at: user.created_at || null,
    updated_at: user.updated_at || null,
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


function getFallbackQuestions() {
  return [
    {
      id: "q_001",
      subject: "english",
      unit: "Reboot 1st Edition",
      question: "次の英文を和訳しなさい。",
      answerType: "text",
      correctAnswer: "私は昨日図書館に行きました。",
      choices: [],
      explanation: "went は go の過去形です。",
    },
  ];
}

function normalizeManagerRole(value) {
  const role = normalizeSupabaseText(value);
  return MANAGER_ROLES.includes(role) ? role : null;
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

function normalizeSupabaseTextArray(value) {
  const source = Array.isArray(value) ? value : value == null ? [] : [value];
  return Array.from(
    new Set(
      source
        .flatMap((item) => (Array.isArray(item) ? item : [item]))
        .map((item) => (typeof item === "number" && Number.isFinite(item) ? String(item) : normalizeSupabaseText(item)))
        .filter(Boolean)
    )
  );
}

function normalizeSupabaseUuid(value) {
  const text = normalizeSupabaseText(value);
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(text)
    ? text.toLowerCase()
    : "";
}

function parseSupabaseTimestamp(value) {
  const time = Date.parse(normalizeSupabaseText(value));
  return Number.isFinite(time) ? time : 0;
}

function normalizeNonNegativeInteger(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? Math.floor(number) : fallback;
}

function normalizeManagerLoginStatus(value) {
  const status = normalizeSupabaseText(value);
  return ["logged_in", "guest", "logged_out"].includes(status) ? status : "logged_out";
}

function normalizeManagerEducationCodes(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeEducationCode).filter(Boolean);
  }
  const text = normalizeSupabaseText(value);
  if (!text) {
    return [];
  }
  if (text.startsWith("[")) {
    try {
      const parsed = JSON.parse(text);
      return Array.isArray(parsed) ? parsed.map(normalizeEducationCode).filter(Boolean) : [];
    } catch {
      return [];
    }
  }
  return text.split(/[,\n]/).map(normalizeEducationCode).filter(Boolean);
}

function readOptionalManagerJsonObjectPatch(body, keys, label) {
  const key = keys.find((candidate) => Object.prototype.hasOwnProperty.call(body, candidate));
  if (!key) {
    return { ok: true, has: false, value: {} };
  }
  const raw = body[key];
  let value = raw;
  if (typeof raw === "string") {
    if (!raw.trim()) {
      value = {};
    } else {
      try {
        value = JSON.parse(raw);
      } catch {
        return { ok: false, error: `${label} must be valid JSON` };
      }
    }
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { ok: false, error: `${label} must be a JSON object` };
  }
  return { ok: true, has: true, value: normalizeJsonObject(value) };
}

function createRecentLoginDaysRecord(dayCount) {
  const count = normalizeNonNegativeInteger(dayCount, 0);
  const loginDays = {};
  const anchor = getJstDateOnly(new Date());
  for (let index = 0; index < count; index += 1) {
    const date = new Date(anchor);
    date.setUTCDate(anchor.getUTCDate() - index);
    loginDays[formatUtcDateKey(date)] = true;
  }
  return loginDays;
}

function getJstDateOnly(date) {
  const jstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return new Date(Date.UTC(jstDate.getUTCFullYear(), jstDate.getUTCMonth(), jstDate.getUTCDate()));
}

function formatUtcDateKey(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toJstIsoString(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  const time = date.getTime();
  if (!Number.isFinite(time)) {
    return "";
  }
  const jstDate = new Date(time + 9 * 60 * 60 * 1000);
  const year = jstDate.getUTCFullYear();
  const month = String(jstDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(jstDate.getUTCDate()).padStart(2, "0");
  const hours = String(jstDate.getUTCHours()).padStart(2, "0");
  const minutes = String(jstDate.getUTCMinutes()).padStart(2, "0");
  const seconds = String(jstDate.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(jstDate.getUTCMilliseconds()).padStart(3, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+09:00`;
}

function normalizeIsoTimestamp(value) {
  const text = normalizeSupabaseText(value);
  if (!text) {
    return "";
  }
  const time = Date.parse(text);
  return Number.isFinite(time) ? toJstIsoString(new Date(time)) : "";
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
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}
