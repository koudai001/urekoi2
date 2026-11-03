import { OpenAPIHono } from "@hono/zod-openapi";
import type { AppEnv } from "../../app";
import { requireAuth } from "../../middleware/require-auth";
import * as getMyProfile from "./get";
import * as postMyProfile from "./post";

const app = new OpenAPIHono<{
  Bindings: AppEnv["Bindings"];
  Variables: AppEnv["Variables"] & { userId: string };
}>();

app.use(requireAuth);

export const myprofile = app
  .openapi(getMyProfile.route, getMyProfile.handler)
  .openapi(postMyProfile.route, postMyProfile.handler);
