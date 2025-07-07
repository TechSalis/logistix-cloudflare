export class ErrorResponse {
  static badRequest(message?: string) {
    return new Response(message || 'Bad Request', { status: 400 });
  }

  static unauthorized(message?: string) {
    return new Response(message || 'Unauthorized', { status: 401 });
  }

  static forbidden(message?: string) {
    return new Response(message || 'Forbidden', { status: 403 });
  }

  static notFound(message?: string) {
    return new Response(message || 'Not Found', { status: 404 });
  }

  static internalServerError(message?: string) {
    return new Response(message || 'Internal Server Error', { status: 500 });
  }
}
