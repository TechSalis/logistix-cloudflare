import { getSupabaseClient } from "@core/db/supabase_client";
import { Env } from "@core/db/types";
import { Coordinates } from "@core/utils/types";

export async function findNearestRider(userCoordinates: Coordinates, token: string, env: Env) {
  const { data, error } = await getSupabaseClient(env, token).rpc('find_nearest_riders', {
    user_lat: userCoordinates.lat,
    user_lng: userCoordinates.lng,
  });

  if (error) console.error("Error finding nearest rider:", error);
  return data;
}
