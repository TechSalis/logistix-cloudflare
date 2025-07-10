import { env } from "cloudflare:workers";
import { handleRequest } from "../../../../../packages/core/lib/verify_jwt";
import { badRequest, internalServerError } from "../../../../../packages/core/utils/http";
import { createOrder } from "../../../../../packages/features/orders/services/order_service";
import { CreateOrder } from "../../../../../packages/features/orders/types";
import validateCreateOrderParams from "../../../../../packages/features/orders/validators/create_order_validator";

export const urlPathPattern = '/create';

export default handleRequest(async ({ req, userId, token }) => {
  try {
    // eslint-disable-next-line no-var
    var json = await req.json() as CreateOrder;
  } catch (err) {
    console.error(urlPathPattern, 'Request.json() failed:', err);
    return badRequest();
  }

  const validation = await validateCreateOrderParams(json);
  if (!validation.valid) {
    return badRequest(validation.error);
  }

  try {
    const response = await createOrder(userId, token, json, env);
    return new Response(JSON.stringify(response.body), { status: response.status });
  } catch (err) {
    console.error(urlPathPattern, "error:", err);
    return internalServerError();
  }
});
