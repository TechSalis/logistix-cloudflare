// Folder: cloudflare/lib/verify-supabase-jwt.ts

import { decodeJwt } from 'jose';

export function handleRequest(
  handler: (data: {
    userId: string;
    json: Record<string, unknown>;
    req: Request;
    env: Env;
    ctx: ExecutionContext;
  }) => Promise<Response>
) {
  return {
    async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
      try {
        const auth = req.headers.get('Authorization');
        if (!auth?.startsWith('Bearer ')) {
          return new Response(JSON.stringify({ error: 'Missing auth token' }), { status: 401 });
        }

        const token = auth.replace('Bearer ', '').trim();
        const { payload } = decodeJwt(token);

        const userId = (payload as { sub: string }).sub;
        if (!userId || typeof userId !== 'string') {
          return new Response(JSON.stringify({ error: 'Invalid token sub' }), { status: 401 });
        }

        const json = await req.json() as Record<string, unknown>;
        return await handler({ userId, json, req, env, ctx });
      } catch (err) {
        console.error('JWT verification failed:', err);
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
      }
    },
  };
}
