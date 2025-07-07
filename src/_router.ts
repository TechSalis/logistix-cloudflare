// Folder: cloudflare/api/_router.ts
import { ErrorResponse } from './db/constants/error_responses';
import v1 from './v1/v1_router';

export default {
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);

    if (url.pathname.startsWith('/v1/')) {
      return v1.route(req);
    }
    return ErrorResponse.notFound();
  },
};
