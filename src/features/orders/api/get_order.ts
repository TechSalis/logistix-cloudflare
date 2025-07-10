import { handleRequest } from "../../../core/lib/verify_jwt";
import { getOrder } from "../services/order_service";

export const urlPathPattern = '/orders/:id';

export default handleRequest(async ({ userId, params }) => {
  const orderId = params.path.id;
  const response = await getOrder(userId, orderId);
  return new Response(JSON.stringify(response.body), { status: response.status });
});
