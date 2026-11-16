import { createMiddleware } from "hono/factory";
import type { AuthedEnv } from "./context";

export const requireAuth = createMiddleware<AuthedEnv>(async (c, next) => {
  const session = await c
    .get("auth")
    .api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    return c.json({ error: "unauthorized" }, 401);
  }
  c.set("userId", session.user.id);
  await next();
});
