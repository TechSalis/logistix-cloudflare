import { handleRequest } from "../../../lib/verify_jwt";
import { getOrder } from "../services/order_service";

export const urlPathPattern = '/orders/:id';

export default handleRequest(async ({ userId, patternMatch }) => {
  const orderId = patternMatch.pathname.groups.id;
  const response = await getOrder(userId, orderId as string);
  return new Response(JSON.stringify(response.body), { status: response.status });
});
