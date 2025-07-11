import { internalServerError } from "@core/utils/http";
import { handleAuth } from "@features/auth/helpers/handle_auth";
import { signupWithPassword } from "@features/auth/services/auth_service";
import { env } from "cloudflare:workers";

export const urlPathPattern = '/signup-password';

export async function execute(req: Request) {
    try {
        const response = await handleAuth(req, async (login) => signupWithPassword(login, env));
        if (response) return response;
    } catch (err) {
        console.error(urlPathPattern, 'error:', err);
    }
    return internalServerError();
}
