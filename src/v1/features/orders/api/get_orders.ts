import { handleRequest } from "../../../lib/verify_jwt";
import { getOrders } from "../services/order_service";

export const urlPathPattern = '/orders';

export default handleRequest(async ({ userId }) => {
  const response = await getOrders(userId);
  return new Response(JSON.stringify(response.body), { status: response.status });
});
