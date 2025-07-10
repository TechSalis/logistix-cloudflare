import { createOrder, type CreateOrderParams } from '../services/order_service';
import { handleRequest } from '../../../../lib/verify_jwt';
import { badRequest, internalServerError } from '../../../../utils/error_responses';
import validateOrderByType from '../validators/create_order_validator';

export const urlPathPattern = '/orders';

export default handleRequest(async ({ req, userId, token }) => {
  try {
    // eslint-disable-next-line no-var
    var json = await req.json() as Record<string, unknown>;
  } catch (err) {
    console.error(urlPathPattern, 'Request.json() failed:', err);
    return badRequest();
  }

  const validation = await validateOrderByType(json);
  if (!validation.valid) {
    return badRequest(validation.error);
  }

  // Extract data properties and Create order
  const body: CreateOrderParams = {
    pickup: json.pickup as Record<string, unknown>,
    dropoff: json.dropoff as Record<string, unknown>,
    description: json.description as string,
    extras: json.extras as Record<string, unknown>,
    order_type: json.order_type as string
  };

  try {
    //TODO: Move to Queue
    const response = await createOrder(userId, token, body);
    return new Response(JSON.stringify(response.body), { status: response.status });
  } catch (err) {
    console.error(urlPathPattern, "error:", err);
    return internalServerError();
  }
});
