import { Env } from "./types";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabaseClient(env: Env, accessToken?: string): SupabaseClient {
  if (accessToken) {
    return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY, { auth: { debug: true } });
  }
  else {
    return client ??= createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY, {
      auth: { debug: true },
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
    });
  }
}

export async function supabaseRequest(
  path: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  token: string,
  env: Env,
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

  return { status: res.status, body: responseBody };
}
