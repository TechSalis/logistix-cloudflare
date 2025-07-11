
export const urlPathPattern = 'get/:id';

export default handleRequest(async ({ userId, params }) => {
  try {
    try {
      // eslint-disable-next-line no-var
      var orderId = params.path.id as string;
    } catch (err) {
      console.error(urlPathPattern, 'Request.json() failed:', err);
      return badRequest();
    }

    const response = await getOrder(userId, orderId, env);
    return new Response(JSON.stringify(response.body), { status: response.status });
  } catch (err) {
    console.error(urlPathPattern, "error:", err);
    return internalServerError();
  }
});
