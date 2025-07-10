import { internalServerError } from "@cloudflare/core/utils/http";
import { handleAuth } from "@cloudflare/features/auth/helpers/handle_auth";
import { upgradeAnonymousUser } from "@cloudflare/features/auth/services/auth_service";
import { env } from "cloudflare:workers";

export const urlPathPattern = '/anonymous/upgrade';

export async function execute(req: Request) {
    try {
        const response = await handleAuth(req, (login) => upgradeAnonymousUser(login, env));
        if (response) return response;
    } catch (err) {
        console.error(urlPathPattern, "error:", err);
    }
    return internalServerError();
}
