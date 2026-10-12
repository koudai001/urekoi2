import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { setCookie } from "hono/cookie";
import { requireAuth } from "../../middlewares/require-auth";
import { createProfileSchema, profileResponseSchema } from "./schema";
import { myProfileService } from "./service";

const createProfileRoute = createRoute({
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

const app = new OpenAPIHono<{
  Bindings: Env;
  Variables: { userId: string };
}>();

app.use(requireAuth);

export const myprofile = app.openapi(createProfileRoute, async (c) => {
  const userId = c.get("userId");
  const data = c.req.valid("json");

  let created;
  try {
    created = await myProfileService.createProfile(userId, data);
  } catch (err) {
    console.error(err);
    return c.json({ error: "internal server error" }, 500);
  }

  // プロフィール設定済みクッキーを設定する
  setCookie(c, "has_profile", "true", {
    httpOnly: false,
    secure: true,
    sameSite: "Strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return c.json(created, 201);
});
