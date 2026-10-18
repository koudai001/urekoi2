import { OpenAPIHono } from "@hono/zod-openapi";
import { requireAuth } from "../../middleware/require-auth";
import * as postMyProfile from "./post";

const app = new OpenAPIHono<{
  Bindings: Env;
  Variables: { userId: string };
}>();

app.use(requireAuth);

export const myprofile = app.openapi(postMyProfile.route, postMyProfile.handler);
