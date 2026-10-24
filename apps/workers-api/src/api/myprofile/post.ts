import { createRoute, type RouteHandler } from "@hono/zod-openapi";
import { myProfileService } from "../../application/myprofile/service";
import { createProfileSchema, profileResponseSchema } from "./schema";

export const route = createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      content: { "application/json": { schema: createProfileSchema } },
    },
  },
  responses: {
    201: {
      description: "プロフィール作成完了",
      content: { "application/json": { schema: profileResponseSchema } },
    },
    400: { description: "バリデーションエラー" },
    500: { description: "内部エラー" },
  },
});

export const handler: RouteHandler<
  typeof route,
  { Bindings: Env; Variables: { userId: string } }
> = async (c) => {
  const userId = c.get("userId");
  const data = c.req.valid("json");

  let created;
  try {
    created = await myProfileService.createProfile(userId, data);
  } catch (err) {
    console.error(err);
    return c.json({ error: "internal server error" }, 500);
  }

  return c.json(created, 201);
};
