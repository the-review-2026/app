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

const TEST_AUTH0_SUB = "test-user";

async function createAnswer(request, env) {
  const supabase = getSupabaseConfig(env);
  if (!supabase) {
    return json({ error: "Supabase is not configured" }, 500);
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

  const userResult = await getUserByAuth0Sub(supabase, TEST_AUTH0_SUB);
  if (!userResult.ok) {
    return json(userResult.body, userResult.status);
  }
  if (!userResult.user) {
    return json(
      {
        error: "Answer could not be saved because the test user was not found",
        auth0Sub: TEST_AUTH0_SUB,
      },
      404
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

async function getUserByAuth0Sub(supabase, auth0Sub) {
  const response = await supabaseRequest(
    supabase,
    `/users?auth0_sub=eq.${encodeURIComponent(auth0Sub)}&select=id&limit=1`
  );

  if (!response.ok) {
    return supabaseError(response, "Failed to look up the test user in Supabase");
  }

  const users = await response.json();
  return {
    ok: true,
    user: Array.isArray(users) ? users[0] ?? null : null,
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
