import { createOrder } from '../services/order_service';
import { handleRequest } from '../../../../lib/verify_jwt';
import { ErrorResponse } from '../../../../utils/error_responses';
import validateOrderByType from '../validators/create_order_validator';

export const urlPathPattern = '/orders';

export default handleRequest(async ({ userId, json }) => {
  const data = json as Record<string, unknown>;

  const validation = await validateOrderByType(data);
  if (!validation.valid) {
    return ErrorResponse.badRequest(validation.error);
  }

  // Extract data properties and Create order
  const pickup = data.pickup as Record<string, unknown>;
  const dropoff = data.dropoff as Record<string, unknown>;
  const description = data.description as string;
  const extras = data.extras as Record<string, unknown>;
  const order_type = data.order_type as string;

  try {
    //TODO: Move to Queue
    const response = await createOrder({ user_id: userId, pickup, dropoff, description, extras, order_type });
    return new Response(JSON.stringify(response.body), { status: response.status });
  } catch (err) {
    console.error("Create order error:", err);
    return ErrorResponse.internalServerError();
  }
});
