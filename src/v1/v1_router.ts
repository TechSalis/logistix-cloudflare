// Folder: cloudflare/api/_router.ts

import { ErrorResponse } from './constants/error_responses';

export default {
  async route(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(req.url.replace('v1/', ''));

    if (url.pathname === '/orders') {
      if (req.method === 'POST') {
        const createOrder = await import('./api/create_order');
        return createOrder.default.fetch(req, env, ctx);
      }
      if (req.method === 'GET') {
        const getOrders = await import('./api/get_orders');
        return getOrders.default.fetch(req, env, ctx);
      }
    }

    return ErrorResponse.notFound();
  },
};
