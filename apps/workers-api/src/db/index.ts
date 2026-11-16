import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

export type Db = ReturnType<typeof createDb>;

/** libsql / Turso クライアントを Drizzle に載せる。 */
export function createDb(url: string, authToken?: string) {
  const client = createClient({ url, authToken });
  return drizzle({ client });
}
