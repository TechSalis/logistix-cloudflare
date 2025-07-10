import { internalServerError } from '../../../core/utils/error_responses';
import { handleAuth } from '../helpers/handle_auth';
import { signupWithPassword } from '../services/auth_service';

export const urlPathPattern = '/auth/signup-password';

export async function execute(req: Request) {
    try {
        const response = await handleAuth(req, async (login) => await signupWithPassword(login));
        if (response) return response;
    } catch (err) {
        console.error(urlPathPattern, 'error:', err);
    }
    return internalServerError();
}
