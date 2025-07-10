import { decodeJwt } from 'jose';
import { ErrorResponse } from '../utils/error_responses';
import type { RouteParams } from './lazy_router';

export function handleRequest(
  handler: (data: {
    req: Request;
    params: RouteParams;
    userId: string;
    token: string;
  }) => Promise<Response>
) {
  return {
    async request(req: Request, params: RouteParams): Promise<Response> {
      try {
        const auth = req.headers.get('Authorization');
        if (!auth?.startsWith('Bearer ')) {
          return ErrorResponse.unauthorized('Missing Auth Bearer token');
        }

        const token = auth.replace('Bearer ', '').trim();
        const userId = decodeJwt(token).sub;
        if (!userId || typeof userId !== 'string') {
          return ErrorResponse.unauthorized('Invalid token sub');
        }
        
        return await handler({ req, userId, token: auth, params });
      } catch (err) {
        console.error('JWT verification failed:', err);
        return ErrorResponse.internalServerError();
      }
    },
  };
}
