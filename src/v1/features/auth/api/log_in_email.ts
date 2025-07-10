import { internalServerError } from '../../../../utils/error_responses';
import { handleAuth } from '../helpers/handle_auth';
import { loginWithPassword } from '../services/auth_service';

export const urlPathPattern = '/auth/login-password';

export async function execute(req: Request) {
    try {
        const response = await handleAuth(req, async (login) => await loginWithPassword(login));
        if (response) return response;
    } catch (err) {
        console.error(urlPathPattern, "error:", err);
    }
    return internalServerError();
}
