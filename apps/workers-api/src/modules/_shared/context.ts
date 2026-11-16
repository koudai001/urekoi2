import type { Db } from "../../db";
import type { WorkerEnv } from "../../worker-env";
import type { Auth } from "./auth";

/** Hono 変数。 */
export type AppEnv = {
  Bindings: WorkerEnv;
  Variables: { db: Db; auth: Auth };
};

/** requireAuth を通ったあとの Hono 変数。 */
export type AuthedEnv = {
  Bindings: WorkerEnv;
  Variables: AppEnv["Variables"] & { userId: string };
};
