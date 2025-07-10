import { handleRequest } from "../../../../lib/verify_jwt";
import { getOrders } from "../services/order_service";

export const urlPathPattern = '/orders?page=:page&count=:count';

export default handleRequest(async ({ userId, token, params }) => {
  const page: number = Number(params?.query?.page || 0);
  const count: number = Number(params?.query?.count || 10);

  const response = await getOrders(token, userId, count, page);
  return new Response(JSON.stringify(response.body), { status: response.status });
});
