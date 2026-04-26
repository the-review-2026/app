export default {
  async fetch(request) {
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

    return json({ error: "Not Found", path: url.pathname }, 404);
  }
};

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