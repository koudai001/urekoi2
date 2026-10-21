import { OpenAPIHono } from "@hono/zod-openapi";
import { requireAuth } from "../../middleware/require-auth";
import * as getMyProfile from "./get";
import * as postMyProfile from "./post";

const app = new OpenAPIHono<{
  Bindings: Env;
  Variables: { userId: string };
}>();

app.use(requireAuth);

export const myprofile = app
  .openapi(getMyProfile.route, getMyProfile.handler)
  .openapi(postMyProfile.route, postMyProfile.handler);
