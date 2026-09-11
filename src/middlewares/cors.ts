import { cors } from "hono/cors";

export const corsMiddleware = cors({
  origin: (_origin, c) => c.env.APP_URL,
  credentials: true,
});
