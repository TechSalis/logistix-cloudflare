/* eslint-disable no-var */

import { env } from "cloudflare:workers";
import { handleRequest } from "../../../../../packages/core/lib/verify_jwt";
import { badRequest, internalServerError } from "../../../../../packages/core/utils/http";
import { getOrders } from "../../../../../packages/features/orders/services/order_service";

export const urlPathPattern = '/get?page=:page&count=:count';

export default handleRequest(async ({ userId, token, params }) => {
  try {
    try {
      var page: number = Number(params?.query?.page ?? 0);
      var count: number = Number(params?.query?.count ?? 0);
    } catch (err) {
      console.error(urlPathPattern, 'Request.json() failed:', err);
      return badRequest();
    }
    const response = await getOrders(token, userId, count, page, env);
    return new Response(JSON.stringify(response.body), { status: response.status });
  } catch (err) {
    console.error(urlPathPattern, "error:", err);
    return internalServerError();
  }
});
