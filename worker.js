// Cloudflare Worker: keeps your Anthropic API key private and rewrites the notes.
// Settings needed in Cloudflare (Settings, Variables and Secrets):
//   ANTHROPIC_API_KEY  secret   your key from console.anthropic.com
//   ACCESS_CODE        secret   a code you choose, typed once into the page
//   ALLOWED_ORIGIN     text     https://YOUR-USERNAME.github.io   (no slash at the end)
//   MODEL              text     optional, defaults to claude-sonnet-5-5
export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = env.ALLOWED_ORIGIN || "";
    const cors = {
      "Access-Control-Allow-Origin": allowed,
      "Access-Control-Allow-Headers": "Content-Type, X-Access-Code",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Vary": "Origin"
    };
    const reply = (obj, status = 200) =>
      new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json" } });

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST") return reply({ error: "method" }, 405);
    if (!allowed || origin !== allowed) return reply({ error: "origin" }, 403);
    if (!env.ACCESS_CODE || request.headers.get("X-Access-Code") !== env.ACCESS_CODE) return reply({ error: "bad_code" }, 401);

    let body;
    try { body = await request.json(); } catch (e) { return reply({ error: "invalid_request" }, 400); }
    const prompt = String((body && body.prompt) || "");
    if (!prompt || prompt.length > 20000) return reply({ error: "prompt_too_large" }, 400);

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: env.MODEL || "claude-sonnet-5-5", max_tokens: 2000, messages: [{ role: "user", content: prompt }] })
    });
    if (!r.ok) return reply({ error: r.status === 429 ? "rate_limited" : "upstream_error" }, 502);
    const data = await r.json();
    const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("");
    return reply({ text });
  }
};

