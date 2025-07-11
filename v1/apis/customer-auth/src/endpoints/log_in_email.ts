import { internalServerError } from "@core/utils/http";
import { handleAuth } from "@features/auth/helpers/handle_auth";
import { loginWithPassword } from "@features/auth/services/auth_service";
import { env } from "cloudflare:workers";

export const urlPathPattern = '/login-password';

export async function execute(req: Request) {
    try {
        const response = await handleAuth(req, async (login) => loginWithPassword(login, env));
        if (response) return response;
    } catch (err) {
        console.error(urlPathPattern, "error:", err);
    }
    return internalServerError();
}
