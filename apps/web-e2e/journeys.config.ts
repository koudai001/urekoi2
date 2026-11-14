import { readdirSync } from "node:fs";
import { join } from "node:path";

export interface JourneyDef {
  id: string;
  file: string;
  kind: "user";
}

// ジャーニー台帳。spec を追加したらここにも書く
export const JOURNEYS: readonly JourneyDef[] = [
  { id: "smoke-home", file: "journeys/smoke-home.spec.ts", kind: "user" },
] as const;

// E2E_JOURNEYS で指定された ID だけに絞る。未指定なら全部
export function resolveJourneys(options: {
  journeys?: string;
}): readonly JourneyDef[] {
  if (options.journeys === undefined || options.journeys.trim() === "") {
    return JOURNEYS;
  }
  const ids = new Set(
    options.journeys
      .split(",")
      .map((value) => value.trim())
      .filter((value) => value.length > 0),
  );
  return JOURNEYS.filter((journey) => ids.has(journey.id));
}

// Playwright の testMatch に渡すパスの一覧にする
export function toTestMatch(journeys: readonly JourneyDef[]): string[] {
  return journeys.map((journey) => journey.file);
}

// 台帳と journeys/ の spec ファイルの過不足を検出する
export function assertRegistryMatchesFiles(testDir: string): void {
  const dir = join(testDir, "journeys");
  const onDisk = new Set(
    readdirSync(dir)
      .filter((name) => name.endsWith(".spec.ts"))
      .map((name) => `journeys/${name}`),
  );
  const registered = new Set(JOURNEYS.map((journey) => journey.file));
  for (const file of onDisk) {
    if (!registered.has(file)) {
      throw new Error(`journeys.config.ts に未登録の spec があります: ${file}`);
    }
  }
  for (const file of registered) {
    if (!onDisk.has(file)) {
      throw new Error(`台帳にある spec がディスクにありません: ${file}`);
    }
  }
}
