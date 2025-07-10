import { internalServerError } from '../../../core/utils/error_responses';
import { handleAuth } from '../helpers/handle_auth';
import { upgradeAnonymousUser } from '../services/auth_service';

export const urlPathPattern = '/auth/anonymous/upgrade';

export async function execute(req: Request) {
    try {
        const response = await handleAuth(req, (login) => upgradeAnonymousUser(login));
        if (response) return response;
    } catch (err) {
        console.error(urlPathPattern, "error:", err);
    }
    return internalServerError();
}
