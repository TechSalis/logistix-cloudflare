import { env } from 'cloudflare:workers';

import { handleRequest } from "@cloudflare/core/lib/verify_jwt";
import { badRequest } from "@cloudflare/core/utils/http";
import validateCoordinates from "@cloudflare/core/utils/validators/coordinates_validator";


export const urlPathPattern = '/riders/location';

export default handleRequest(async ({ req, userId }) => {
    try {
        // eslint-disable-next-line no-var
        var { lat, lng } = await req.json() as Record<string, unknown>;
    } catch (err) {
        console.error(urlPathPattern, 'Request.json() failed:', err);
        return badRequest();
    }

    const validation = validateCoordinates(lat, lng);
    if (!validation.valid) {
        return badRequest(validation.error);
    }

    const key = `rider:locations:${userId}`;
    const payload = { lat: lat as number, lng: lng as number, updated_at: Date.now() };

    await env.RIDER_KV.put(key, JSON.stringify(payload));
    return new Response(JSON.stringify({ success: true }));
});
