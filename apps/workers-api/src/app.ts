import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";
import type { AppConfig } from "./config";
import type { Db } from "./db";
import type { Auth } from "./modules/_shared/auth";
import type { AppEnv } from "./modules/_shared/context";
import { myprofileRoutes } from "./modules/myprofile/myprofile.routes";
import { searchRoutes } from "./modules/search/search.routes";

interface AppDeps {
  config: AppConfig;
  db: Db;
  auth: Auth;
}

export function createApp({ config, db, auth }: AppDeps) {
  const app = new OpenAPIHono<AppEnv>();
  app.use("*", cors({ origin: config.webUrl, credentials: true }));
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
