// Folder: cloudflare/api/create-order.ts

import { createOrder } from '../services/order_service';
import { handleRequest } from '../lib/verify_supabase_jwt';
import { ErrorResponse } from '../constants/error_responses';
import { OrderTypes } from '../constants/db_constants';
import { ValidatorResponse } from '../validators/validator_response';

export default handleRequest(async ({ userId, json, env }) => {
  // Validates [json] data by [order_type]'s value because each order type has its own requirements
  
  let validateOrderInput: ((input: Record<string, unknown>) => ValidatorResponse);

  const order_type = json.order_type as string;
  
  if (order_type === OrderTypes.food) {
    validateOrderInput = (await import('../validators/create_order/food_order_validator')).validateOrderInput;
  } else if (order_type === OrderTypes.delivery) {
    validateOrderInput = (await import('../validators/create_order/delivery_order_validator')).validateOrderInput;
  } else {
    return new Response(JSON.stringify({ error: `Invalid order_type value: ${order_type}` }), { status: 400 });
  }

  const validation = validateOrderInput(json);
  if (!validation.valid) {
    return new Response(JSON.stringify({ error: validation.error }), { status: 400 });
  }

  // Extract json properties and Create order
  const pickup = json.pickup as Record<string, unknown>;
  const dropoff = json.dropoff as Record<string, unknown>;
  const description = json.description as string;
  const extras = json.extras as Record<string, unknown>;

  try {
    //TODO: Move to Queue
    const response = await createOrder({ userId, pickup, dropoff, description, extras, order_type }, env);
    return new Response(JSON.stringify(response.body), { status: response.status });
  } catch (err) {
    console.error("Create order error:", err);
    return ErrorResponse.internalServerError();
  }
});
