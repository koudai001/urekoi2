import { Hono } from "hono";
import { auth } from "./auth";
import { corsMiddleware } from "./middlewares/cors";

const app = new Hono<{ Bindings: Env }>();

app.use("/api/auth/*", corsMiddleware);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

export default app;
