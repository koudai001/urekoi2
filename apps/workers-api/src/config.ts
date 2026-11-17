import { z } from "zod";
import type { WorkerEnv } from "./worker-env";

/** アプリ設定。Workers の env を検証して詰め替える。 */
export interface AppConfig {
  webUrl: string;
  betterAuthUrl: string;
  databaseUrl: string;
  databaseAuthToken: string;
  betterAuthSecret: string;
}

const BindingsSchema = z.object({
  WEB_URL: z.string().min(1),
  BETTER_AUTH_URL: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  DATABASE_AUTH_TOKEN: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(1),
});

export function configFromBindings(env: WorkerEnv): AppConfig {
  const parsed = BindingsSchema.parse(env);
  return {
    webUrl: parsed.WEB_URL,
    betterAuthUrl: parsed.BETTER_AUTH_URL,
    databaseUrl: parsed.DATABASE_URL,
    databaseAuthToken: parsed.DATABASE_AUTH_TOKEN,
    betterAuthSecret: parsed.BETTER_AUTH_SECRET,
  };
}

const ProcessEnvSchema = z.object({
  WEB_URL: z.string().default("http://localhost:5300"),
  BETTER_AUTH_URL: z.string().default("http://localhost:8800"),
  DATABASE_URL: z.string().default("file:./local.db"),
  DATABASE_AUTH_TOKEN: z.string().default(""),
  BETTER_AUTH_SECRET: z.string().default("local-dev-secret"),
});

/** Node / テスト用。process.env から設定を作る（未設定は既定値）。 */
export function configFromProcessEnv(
  env: NodeJS.ProcessEnv = process.env,
): AppConfig {
  const parsed = ProcessEnvSchema.parse(env);
  return {
    webUrl: parsed.WEB_URL,
    betterAuthUrl: parsed.BETTER_AUTH_URL,
    databaseUrl: parsed.DATABASE_URL,
    databaseAuthToken: parsed.DATABASE_AUTH_TOKEN,
    betterAuthSecret: parsed.BETTER_AUTH_SECRET,
  };
}
