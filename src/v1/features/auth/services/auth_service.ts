import { createClient } from '@supabase/supabase-js';
import { env } from 'cloudflare:workers';
import type { UserMetadata } from '../helpers/auth_interface';
import type { UserRole } from '../../../../db/constants/db_constants';

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

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY, {
    auth: {
        debug: true,
        // autoRefreshToken: false,
        // persistSession: false,
    },
});

export async function loginAnonymously(): Promise<LoginResponse> {
    const response = await supabase.auth.signInAnonymously({
        options: {
            data: { role: 'customer' as UserRole },
        }
    });
    return { user: { ...response.data.user }, session: { ...response.data.session }, error: { ...response.error } };
}

export async function upgradeAnonymousUser(login: LoginParams): Promise<LoginResponse> {
    const response = await supabase.auth.updateUser({ email: login.email, password: login.password });
    return { user: { ...response.data.user },  error: { ...response.error } };
}

export async function signupWithPassword(login: LoginParams, data?: UserMetadata): Promise<LoginResponse> {
    const response = await supabase.auth.signUp({
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

export async function loginWithPassword(login: LoginParams): Promise<LoginResponse> {
    const response = await supabase.auth.signInWithPassword({ email: login.email, password: login.password });
    return { user: { ...response.data.user }, session: { ...response.data.session }, error: { ...response.error } };
}

export async function loginWithSocialToken(provider: 'google' | 'facebook' | 'apple', token: string): Promise<LoginResponse> {
    const response = await supabase.auth.signInWithIdToken({ provider, token: token });
    return { user: { ...response.data.user }, session: { ...response.data.session }, error: { ...response.error } };
}

export async function getUserFromToken(jwt: string) {
    const response = await supabase.auth.getUser(jwt);
    return { user: response.data.user, error: response.error };
}
