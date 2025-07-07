import { decodeJwt } from 'jose';
import { ErrorResponse } from '../utils/error_responses';

export function handleRequest(
  handler: (data: {
    userId: string;
    json?: Record<string, unknown>;
    patternMatch: URLPatternResult;
  }) => Promise<Response>
) {
  return {
    async request(req: Request, patternMatch: URLPatternResult): Promise<Response> {
      try {
        const auth = req.headers.get('Authorization');
        if (!auth?.startsWith('Bearer ')) {
          return ErrorResponse.unauthorized('Missing auth token');
        }

        const token = auth.replace('Bearer ', '').trim();
        const userId = decodeJwt(token).sub;
        if (!userId || typeof userId !== 'string') {
          return ErrorResponse.unauthorized('Invalid token sub');
        }

        let json: Record<string, unknown> | undefined;

        if (req.headers.get('content-type')?.includes('application/json')) {
          try {
            json = await req.json() as Record<string, unknown>;
          } catch (err) {
            console.error('Request.json() failed:', err);
            return ErrorResponse.badRequest();
          }
        }

        return await handler({ userId, json, patternMatch });
      } catch (err) {
        console.error('JWT verification failed:', err);
        return ErrorResponse.internalServerError();
      }
    },
  };
}
