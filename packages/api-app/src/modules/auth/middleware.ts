import type { Context, Next } from "hono";
import type { AuthStrategy } from "./strategies/StaticTokenAuthStrategy";

export function createAuthMiddleware(authStrategy: AuthStrategy) {
	return async (c: Context, next: Next) => {
		const authHeader = c.req.header("Authorization");
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return c.json(
				{
					success: false,
					error: {
						code: "UNAUTHORIZED",
						message: "Missing or invalid authorization header",
					},
				},
				401,
			);
		}

		const token = authHeader.slice(7);
		const result = await authStrategy.verify(token);

		if (!result.isValid) {
			return c.json(
				{
					success: false,
					error: { code: "UNAUTHORIZED", message: "Invalid or inactive token" },
				},
				401,
			);
		}

		c.set("authToken", result.token);
		await next();
	};
}
