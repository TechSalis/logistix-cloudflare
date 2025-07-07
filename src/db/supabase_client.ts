// Folder: cloudflare/db/supabase-client.ts

import { env } from "cloudflare:workers";

export async function supabaseRequest(
  path: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  body?: unknown
) {
  const url = `${env.SUPABASE_URL}/rest/v1/${path}`;

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'apikey': env.SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = res.headers.get('content-type') ?? '';
  let responseBody: unknown = null;
  if (contentType.includes('application/json')) {
    responseBody = await res.json();
  } else {
    console.warn('SupabaseRequest Response is not json');
  }

  return {
    status: res.status,
    body: responseBody,
  };
}
