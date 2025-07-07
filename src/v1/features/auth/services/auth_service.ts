import { AuthError, createClient, Session, User } from '@supabase/supabase-js';
import { UserTypes } from '../../../../db/constants/db_constants';
import { env } from 'cloudflare:workers';

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
    // global: {
    //     headers: { Authorization: `Bearer ${env.SUPABASE_SERVICE_KEY}` },
    // },
});

export async function anonymousSignup(): Promise<{ user: User | null; session: Session | null; error: AuthError | null }> {
    const response = await supabase.auth.signInAnonymously();
    return { user: response.data.user, session: response.data.session, error: response.error };
}

export async function loginWithPassword(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
}

export async function loginWithSocialToken(provider: 'google' | 'facebook' | 'apple', accessToken: string) {
    return supabase.auth.signInWithIdToken({
        provider,
        token: accessToken
    });
}

export async function signupWithPassword(email: string, password: string, role: string | null = UserTypes.customer) {
    return supabase.auth.signUp({
        email,
        password,
        options: {
            data: { role: role || UserTypes.customer },
        },
    });
}


export async function getUserFromToken(jwt: string) {
    return supabase.auth.getUser(jwt);
}
