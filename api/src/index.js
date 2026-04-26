export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(),
      });
    }

    if (url.pathname === "/questions" && request.method === "GET") {
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

    if (url.pathname === "/me/answers" && request.method === "POST") {
      return createAnswer(request, env);
    }

    return json({ error: "Not Found", path: url.pathname }, 404);
  }
};

const AUTH0_JWKS_CACHE_TTL_MS = 5 * 60 * 1000;
const auth0JwksCache = new Map();

async function createAnswer(request, env) {
  const supabase = getSupabaseConfig(env);
  if (!supabase) {
    return json({ error: "Supabase is not configured. SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required." }, 500);
  }

  const authResult = await authenticateRequest(request, env);
  if (!authResult.ok) {
    return json(authResult.body, authResult.status);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const answerPayload = normalizeAnswerPayload(body);
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
  if (!existingUser.ok || existingUser.user) {
    return existingUser;
  }

  const createdUser = await createUser(supabase, {
    auth0_sub: auth0Sub,
    display_name: getDisplayNameFromClaims(claims),
  });
  if (createdUser.ok) {
    return createdUser;
  }

  if (createdUser.status === 409) {
    return getUserByAuth0Sub(supabase, auth0Sub);
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
