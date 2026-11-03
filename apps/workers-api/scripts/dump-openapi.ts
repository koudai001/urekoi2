import { writeFile } from "node:fs/promises";
import { URL } from "node:url";

// pnpm dev で起動したAPIから取得する。
async function main() {
  const url = process.env.OPENAPI_URL ?? "http://localhost:8787/api/doc";
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`OpenAPI取得失敗: ${res.status} ${await res.text()}`);
  }

  const json = await res.json();
  await writeFile(
    new URL("../openapi.json", import.meta.url),
    `${JSON.stringify(json, null, 2)}\n`,
  );
  console.info("OpenAPI written to openapi.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
