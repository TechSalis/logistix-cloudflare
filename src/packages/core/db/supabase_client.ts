import { Env } from "./types";
import { createClient, SupabaseClient } from "@supabase/supabase-js";


let client: SupabaseClient | null = null;

export function getSupabaseClient(env: Env, accessToken?: string): SupabaseClient {
  if (accessToken) {
    return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, { auth: { debug: true } });
  }
  else {
    return client ??= createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
      auth: { debug: true },
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
    });
  }
}
