type AsyncHandler = (request: Request) => Promise<Response>;

interface RouteEntry {
  method: string;
  path: string;
  handler: AsyncHandler;
  pattern: URLPattern;
}

export class LazyRouter {
  private routes: RouteEntry[] = [];

  on(method: string, path: string, handler: AsyncHandler) {
    this.routes.push({
      method: method.toUpperCase(),
      path,
      handler: handler,
      pattern: new URLPattern({ pathname: path }),
    });
  }

  async route(request: Request): Promise<Response | null> {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();

    for (const route of this.routes) {
      if (route.method === method) {
        const match = route.pattern.exec({ pathname: url.pathname });
        if (match) {
          return await route.handler(request);
        }
      }
    }
    return null;
  }
}
