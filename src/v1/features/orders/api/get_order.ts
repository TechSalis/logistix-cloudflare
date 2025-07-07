import { ErrorResponse } from "../../../constants/error_responses";
import { handleRequest } from "../../../lib/verify_jwt";
import { getOrder } from "../services/order_service";

export const urlPathPattern = '/orders/:id';

export default handleRequest(async ({ userId, req }) => {
  let orderId: unknown;
  try {
    const pattern = new URLPattern({ pathname: urlPathPattern });
    orderId = pattern.exec(req.url)!.pathname.groups.id;
  } catch (error) {
    console.error(`Failed to get Order ${orderId ?? ''}`, error);
    return ErrorResponse.badRequest();
  }
  const response = await getOrder(userId, orderId as string);
  return new Response(JSON.stringify(response.body), { status: response.status });
});
