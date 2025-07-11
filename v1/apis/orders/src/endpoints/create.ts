
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
