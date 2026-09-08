import { env } from "cloudflare:workers";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(drizzle(env.DB), {
    provider: "sqlite",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
