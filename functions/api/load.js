export async function onRequestGet(context) {
  const { env } = context;

  const row = await env.DB
    .prepare("SELECT data FROM checklists WHERE id = ?")
    .bind("main")
    .first();

  if (!row) {
    return new Response(JSON.stringify({ ok: true, data: null }), {
      headers: { "content-type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true, data: JSON.parse(row.data) }), {
    headers: { "content-type": "application/json" },
  });
}
