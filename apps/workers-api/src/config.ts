import { z } from "zod";
import type { WorkerEnv } from "./worker-env";

/** アプリ設定。Workers の env を検証して詰め替える。 */
export interface AppConfig {
  appUrl: string;
  databaseUrl: string;
  databaseAuthToken: string;
  betterAuthSecret: string;
}

const BindingsSchema = z.object({
  APP_URL: z.string().min(1),
  TURSO_DATABASE_URL: z.string().min(1),
  TURSO_AUTH_TOKEN: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(1),
});

export function configFromBindings(env: WorkerEnv): AppConfig {
  const parsed = BindingsSchema.parse(env);
  return {
    appUrl: parsed.APP_URL,
    databaseUrl: parsed.TURSO_DATABASE_URL,
    databaseAuthToken: parsed.TURSO_AUTH_TOKEN,
    betterAuthSecret: parsed.BETTER_AUTH_SECRET,
  };
}
