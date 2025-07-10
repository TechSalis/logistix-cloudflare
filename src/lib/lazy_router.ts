export type RouteParams = {
  path: Record<string, string>;
  query?: Record<string, unknown>;
};

type AsyncHandler = (
  request: Request,
  params: RouteParams
) => Promise<Response>;

type RouteEntry = {
  method: string;
  path: string;
  handler: AsyncHandler;
}

export class LazyRouter {
  private routePrefix?: string;
  constructor(routePrefix?: string) {
    this.routePrefix = routePrefix;
  }

  private routes: RouteEntry[] = [];

  on(method: string, path: string, handler: AsyncHandler) {
    this.routes.push({
      method: method.toUpperCase(),
      path: path,
      handler: handler,
    });
  }

  async route(request: Request): Promise<Response | undefined> {
    for (const route of this.routes) {
      if (route.method === request.method.toUpperCase()) {

        const routeSegments = route.path.split('?');

        const pathPattern = new URLPattern({ pathname: this.routePrefix + routeSegments[0] });
        const match = pathPattern.exec(request.url);

        console.log(request.method, request.url, '->', route.method, route.path, '=', match);
        if (match) {
          const pathParams = match.pathname.groups;

          let queryParams: Record<string, string> | undefined;
          if (routeSegments.length == 2) {
            const searchPattern = new URLPattern({ search: routeSegments[1] });
            const match = searchPattern.exec(request.url);
            
            console.log("Search params:", match)
            queryParams = match?.search.groups;
          }
          const params: RouteParams = {
            path: pathParams,
            query: queryParams,
          };

          return await route.handler(request, params);
        }
      }
    }
  }
}
