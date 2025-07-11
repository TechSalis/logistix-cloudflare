import { env } from "cloudflare:workers";

import { handleRequest } from "@core/lib/verify_jwt";
import { badRequest, internalServerError } from "@core/utils/http";
import validateCoordinates from "@core/utils/validators/coordinates_validator";
import { Coordinates } from '@core/utils/types';
import { findNearestRider } from "@features/riders/services/riders_service";


export const urlPathPattern = '/riders/find-nearest?lat=:lat&lng=:lng';

export default handleRequest(async ({ params, token }) => {
  const validation = validateCoordinates(params.query?.lat, params.query?.lng);
  if (!validation.valid) {
    return badRequest(validation.error);
  }

  const coordinates: Coordinates = { lat: params.query!.lat as number, lng: params.query!.lng as number };
  try {
    const rider = await findNearestRider(coordinates, token, env);
    return rider ? new Response(JSON.stringify(rider), { status: 200 }) : internalServerError();
  } catch (err) {
    console.error('findNearestRider RPC failed:', err);
    return internalServerError();
  }
});
