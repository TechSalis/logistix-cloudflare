import { UserRole } from "@core/db/types";
import { badRequest } from "@core/utils/http";
import type { LoginParams, LoginResponse } from "../services/auth_service";
import validateAuthLoginInput from "../validators/auth_validator";
import { mapSession, mapUser } from "./auth_interface";

export async function handleAuth(req: Request, service: (login: LoginParams) => Promise<LoginResponse>) {
    const json = await req.json() as Record<string, unknown>;
    const { email, password, role } = json;

    const validationError = validateAuthLoginInput(email, password, role);
    if (!validationError.valid) {
        return badRequest(validationError.error);
    }

    const authService = await service({ email: email as string, password: password as string, role: role as UserRole });
    const response = handleAuthResponse({
        user: { ...authService.user },
        session: { ...authService.session },
        error: { ...authService.error }
    });
    if (response) return response;
}

function handleAuthResponse(auth: {
    user: Record<string, unknown> | null;
    session?: Record<string, unknown> | null;
    error: Record<string, unknown> | null;
}) {
    if (auth.user && auth.session) {
        const user = mapUser(auth.user as Record<string, unknown>);
        const session = mapSession(auth.session as Record<string, unknown>);

        return new Response(JSON.stringify({ user, session }), { status: 200 });
    }
    if (auth.error) {
        return new Response(auth.error.message as string, { status: auth.error.status as number });
    }
}
