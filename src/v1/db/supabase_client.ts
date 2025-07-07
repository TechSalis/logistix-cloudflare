// Folder: cloudflare/db/supabase-client.ts

export async function supabaseRequest(
  path: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  env: Env,
  body?: unknown
) {
  const url = `${env.SUPABASE_URL}/rest/v1/${path}`;

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'apikey': env.SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return {
    status: res.status,
    body: await res.json()
  };
}
