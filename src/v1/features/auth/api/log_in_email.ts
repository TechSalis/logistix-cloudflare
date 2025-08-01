import { ErrorResponse } from '../../../constants/error_responses';
import { mapSession, mapUser } from '../helpers/data_interfaces';
import { loginWithPassword } from '../services/auth_service';
import validateAuthInput from '../validators/auth_validator';

export const urlPathPattern = '/auth/login-password';

export async function execute(request: Request) {
    try {
        const json = await request.json() as Record<string, unknown>;
        const { email, password } = json;

        const validationError = validateAuthInput(email, password);
        if (!validationError.valid) {
            return ErrorResponse.badRequest(validationError.error);
        }

        const authService = await loginWithPassword(email as string, password as string);

        if (authService.data.user && authService.data.session) {
            const { user, session } = authService.data;
            const mappedUser = mapUser({ ...user });
            const mappedSession = mapSession({ ...session });

            return new Response(JSON.stringify({ user: mappedUser, session: mappedSession }), { status: 200 });
        }

        if (authService.error) {
            return new Response(authService.error.message, { status: authService.error.status });
        }
    } catch (err) {
        console.error("Log in with password error:", err);
    }
    return ErrorResponse.internalServerError();
}
