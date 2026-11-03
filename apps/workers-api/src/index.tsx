import { createApp } from "./app";
import { db } from "./db";
import { auth } from "./lib/auth";

export const routes = createApp({ db, auth });

export default routes;
export type { AppType } from "./app";
