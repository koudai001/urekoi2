import "dotenv/config";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { prefecture } from "./schema";
import { PREFECTURES as prefectures } from "urekoi2-shared";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const db = drizzle({ client });

async function main() {
  for (const row of prefectures) {
    await db
      .insert(prefecture)
      .values(row)
      .onConflictDoUpdate({
        target: prefecture.code,
        set: {
          name: row.name,
        },
      });
  }
  console.log(`Seeded ${prefectures.length} prefectures`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => client.close());
