import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import {
  assertRegistryMatchesFiles,
  resolveJourneys,
  toTestMatch,
} from "./journeys.config";

dotenv.config();

const testDir = import.meta.dirname;
assertRegistryMatchesFiles(testDir);

const selectedJourneys = resolveJourneys({
  journeys: process.env.E2E_JOURNEYS,
});

// web-app の E2E。webServer で web-app を起動する（起動済みなら再利用）
export default defineConfig({
  testDir: ".",
  testMatch: [...toTestMatch(selectedJourneys)],
  fullyParallel: false,
  workers: 1,
  forbidOnly: process.env.CI !== undefined,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    locale: "ja-JP",
    timezoneId: "Asia/Tokyo",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    ...devices["iPhone 15"],
    baseURL: process.env.E2E_BASE_URL ?? "http://localhost:5300",
  },
  webServer: {
    command: "pnpm --filter @urekoi/web-app dev",
    url: "http://localhost:5300",
    reuseExistingServer: process.env.CI === undefined,
    timeout: 120_000,
  },
});
