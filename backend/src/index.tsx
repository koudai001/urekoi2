import { Hono } from "hono";
import { auth } from "./lib/auth";
import { myprofile } from "./features/myprofile";

const app = new Hono<{ Bindings: Env }>();

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));
app.route("/api/myprofile", myprofile);

export default app;
