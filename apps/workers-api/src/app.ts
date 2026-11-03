import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import type { db } from "./db";
import type { auth } from "./lib/auth";
import { myprofileRoutes } from "./modules/myprofile/myprofile.routes";
import { searchRoutes } from "./modules/search/search.routes";

export type AppEnv = {
  Bindings: Env;
  Variables: { db: typeof db; auth: typeof auth };
};

interface AppDeps {
  db: typeof db;
  auth: typeof auth;
}

export function createApp({ db, auth }: AppDeps) {
  const app = new OpenAPIHono<AppEnv>();
  const api = app.basePath("/api");

  api.use("*", async (c, next) => {
    c.set("db", db);
    c.set("auth", auth);
    await next();
  });

  const routes = api
    .on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw))
    .route("/myprofile", myprofileRoutes())
    .route("/search", searchRoutes());

  api.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "urekoi2 API",
      description:
        "認証についてはBETTER-AUTHを利用。詳細は公式ドキュメントを参照してください。",
    },
  });
  api.get("/doc/ui", Scalar({ url: "/api/doc" }));

  return routes;
}

export type AppType = ReturnType<typeof createApp>;
