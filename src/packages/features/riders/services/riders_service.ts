import { getSupabaseClient } from "@cloudflare/core/db/supabase_client";
import { Env } from "@cloudflare/core/db/types";
import { Coordinates } from "@cloudflare/core/utils/types";


// Find nearest rider
export async function findNearestRider(userCoordinates: Coordinates, token: string, env: Env) {
  const { lat, lng } = userCoordinates;
  const { data, error } = await getSupabaseClient(env, token).rpc('find_nearest_riders', {
      user_lat: lat,
      user_lng: lng,
    });

  if (error) {
    console.error("Error finding nearest rider:", error);
    return null;
  }

  return data ?? null; // Return the closest one
}
