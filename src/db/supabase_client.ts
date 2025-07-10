// Folder: cloudflare/db/supabase-client.ts

import { env } from "cloudflare:workers";

export async function supabaseRequest(
  path: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  token: string,
  body?: unknown,
) {
  const url = `${env.SUPABASE_URL}/rest/v1/${path}`;

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'apikey': env.SUPABASE_SERVICE_KEY,
      'Authorization': token,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = res.headers.get('content-type') ?? '';
  let responseBody: unknown = null;
  if (contentType.includes('application/json')) {
    responseBody = await res.json();
  } else {
    console.warn('supabaseRequest: responseBody is not a json');
  }

  return {
    status: res.status,
    body: responseBody,
  };
}
