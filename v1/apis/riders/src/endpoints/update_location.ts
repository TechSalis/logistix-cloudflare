import { env } from 'cloudflare:workers';

import { handleRequest } from "@core/lib/verify_jwt";
import { badRequest } from "@core/utils/http";
import validateCoordinates from "@core/utils/validators/coordinates_validator";


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

    const payload = { lat: lat as number, lng: lng as number, updated_at: Date.now() };

    // await env.RIDER_KV.put(riderlocationKeyPrefix + userId, JSON.stringify(payload), { expirationTtl: 600 });
    // return new Response(JSON.stringify({ success: true }));
});
