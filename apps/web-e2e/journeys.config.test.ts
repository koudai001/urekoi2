import { describe, expect, it } from "vitest";
import { JOURNEYS, resolveJourneys, toTestMatch } from "./journeys.config";

describe("journeys.config", () => {
  it("既定では全ジャーニーを返す", () => {
    expect(resolveJourneys({})).toEqual(JOURNEYS);
  });

  it("ID 指定で絞り込む", () => {
    expect(resolveJourneys({ journeys: "smoke-home" })).toEqual([JOURNEYS[0]]);
  });

  it("testMatch 用のパスを返す", () => {
    expect(toTestMatch(JOURNEYS)).toContain("journeys/smoke-home.spec.ts");
  });
});
