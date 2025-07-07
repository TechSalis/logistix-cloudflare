export type AsyncHandler = (request: Request, patternMatch: URLPatternResult) => Promise<Response>;

interface RouteEntry {
  method: string;
  // path: string;
  handler: AsyncHandler;
  pattern: URLPattern;
}

export class LazyRouter {
  constructor(routePrefix?: string) {
    this.routePrefix = routePrefix;
  }
  private routes: RouteEntry[] = [];
  private routePrefix?: string;

  on(method: string, path: string, handler: AsyncHandler) {
    this.routes.push({
      method: method.toUpperCase(),
      // path,
      handler: handler,
      pattern: new URLPattern({ pathname: `${this.routePrefix}${path}` }),
    });
  }

  async route(request: Request): Promise<Response | null> {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();

    for (const route of this.routes) {
      if (route.method === method) {
        const match = route.pattern.exec({ pathname: url.pathname });
        if (match) {
          return await route.handler(request, match);
        }
      }
    }
    return null;
  }
}
