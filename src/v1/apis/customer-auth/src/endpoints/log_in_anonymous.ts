import { internalServerError } from "@cloudflare/core/utils/http";
import { handleAuth } from "@cloudflare/features/auth/helpers/handle_auth";
import { loginAnonymously } from "@cloudflare/features/auth/services/auth_service";

export const urlPathPattern = '/anonymous/login';

export async function execute(req: Request) {
    try {
        const response = await handleAuth(req, loginAnonymously);
        if (response) return response;
    } catch (err) {
        console.error(urlPathPattern, "error:", err);
    }
    return internalServerError();
}
