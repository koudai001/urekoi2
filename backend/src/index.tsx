import { OpenAPIHono } from "@hono/zod-openapi";
import { auth } from "./lib/auth";
import { myprofile } from "./features/myprofile";
import { swaggerUI } from "@hono/swagger-ui";

const app = new OpenAPIHono<{ Bindings: Env }>();

const api = app.basePath("/api");

export const routes = api
  .on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw))
  .route("/myprofile", myprofile);

// OpenAPIドキュメントのエンドポイント
api.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "urekoi2 API",
    description:
      "認証についてはBETTER-AUTHを利用。詳細は公式ドキュメントを参照してください。",
  },
});
// swagger-ui
api.get("/doc/ui", swaggerUI({ url: "/api/doc" }));

export default app;
export type AppType = typeof routes;
