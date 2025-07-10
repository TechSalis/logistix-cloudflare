import { getSupabaseClient } from '@cloudflare/core/db/supabase_client';
import { Env, UserRole } from '@cloudflare/core/db/types';
import type { UserMetadata } from '../helpers/auth_interface';

export type LoginParams = {
    email: string;
    password: string;
    role?: UserRole;
}

export type LoginResponse = {
    user: Record<string, unknown> | null;
    session?: Record<string, unknown>;
    error?: Record<string, unknown>;
}

export async function loginAnonymously(env: Env): Promise<LoginResponse> {
    const response = await getSupabaseClient(env).auth.signInAnonymously({
        options: {
            data: { role: 'customer' as UserRole },
        }
    });
    return { user: { ...response.data.user }, session: { ...response.data.session }, error: { ...response.error } };
}

export async function upgradeAnonymousUser(login: LoginParams, env: Env): Promise<LoginResponse> {
    const response = await getSupabaseClient(env).auth.updateUser({ email: login.email, password: login.password });
    return { user: { ...response.data.user },  error: { ...response.error } };
}

export async function signupWithPassword(login: LoginParams, env: Env, data?: UserMetadata): Promise<LoginResponse> {
    const response = await getSupabaseClient(env).auth.signUp({
        email: login.email, password: login.password,
        options: {
            data: {
                ...data,
                role: (data?.role || 'customer') as UserRole,
            },
        }
    });
    return { user: { ...response.data.user }, session: { ...response.data.session }, error: { ...response.error } };
}

export async function loginWithPassword(login: LoginParams, env: Env): Promise<LoginResponse> {
    const response = await getSupabaseClient(env).auth.signInWithPassword({ email: login.email, password: login.password });
    return { user: { ...response.data.user }, session: { ...response.data.session }, error: { ...response.error } };
}

export async function loginWithSocialToken(provider: 'google' | 'facebook' | 'apple', token: string, env: Env): Promise<LoginResponse> {
    const response = await getSupabaseClient(env).auth.signInWithIdToken({ provider, token: token });
    return { user: { ...response.data.user }, session: { ...response.data.session }, error: { ...response.error } };
}

export async function getUserFromToken(jwt: string, env: Env) {
    const response = await getSupabaseClient(env).auth.getUser(jwt);
    return { user: response.data.user, error: response.error };
}
