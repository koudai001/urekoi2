import { Hono } from "hono";
import { auth } from "./lib/auth";
import { myprofile } from "./features/myprofile";

const app = new Hono<{ Bindings: Env }>()
  .on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw))
  .route("/api/myprofile", myprofile);

export default app;
export type AppType = typeof app;
