// cloudflare/api/get-orders.ts

import { handleRequest } from '../lib/verify_supabase_jwt';
import { getOrders } from '../services/order_service';

export default handleRequest(async ({ userId, env }) => {
  const response = await getOrders(userId, env);
  return new Response(JSON.stringify(response.body), { status: response.status });
});
