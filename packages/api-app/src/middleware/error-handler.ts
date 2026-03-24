import type { Context, Next } from 'hono';

export function errorHandler() {
  return async (c: Context, next: Next) => {
    try {
      await next();
    } catch (error) {
      console.error('[API Error]', error);
      return c.json(
        {
          success: false,
          error: {
            code: 'INTERNAL_ERROR',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
          },
        },
        500
      );
    }
  };
}

export function notFoundHandler() {
  return (c: Context) => {
    return c.json(
      {
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Route not found',
        },
      },
      404
    );
  };
}
