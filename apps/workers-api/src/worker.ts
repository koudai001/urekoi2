import { getEmailConfig } from "@urekoi/email";
import type { ExecutionContext } from "hono";
import { createApp } from "./app";
import { configFromBindings } from "./config";
import { createDb } from "./db";
import { createAuth } from "./modules/_shared/auth";
import type { WorkerEnv } from "./worker-env";

type AppInstance = ReturnType<typeof createApp>;
let cachedApp: AppInstance | undefined;

function getApp(env: WorkerEnv): AppInstance {
  if (cachedApp !== undefined) {
    return cachedApp;
  }
  const config = configFromBindings(env);
  const db = createDb(config.databaseUrl, config.databaseAuthToken);
  const emailConfig = getEmailConfig(env, { email: env.EMAIL });
  const auth = createAuth({ config, db, emailConfig });
  cachedApp = createApp({ config, db, auth });
  return cachedApp;
}

export default {
  async fetch(request: Request, env: WorkerEnv, ctx: ExecutionContext) {
    return getApp(env).fetch(request, env, ctx);
  },
};

export type { AppType } from "./app";
