export async function onRequestPost(context) {
  const { request, env } = context;

  const body = await request.json();
  const json = JSON.stringify(body);
  const updatedAt = new Date().toISOString();

  await env.DB
    .prepare(`
      INSERT INTO checklists (id, data, updated_at)
      VALUES (?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        data = excluded.data,
        updated_at = excluded.updated_at
    `)
    .bind("main", json, updatedAt)
    .run();

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "content-type": "application/json" },
  });
}
