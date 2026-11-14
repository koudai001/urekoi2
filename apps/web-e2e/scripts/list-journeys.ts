import { JOURNEYS } from "../journeys.config";

for (const journey of JOURNEYS) {
  // biome-ignore lint/suspicious/noConsole: 一覧をターミナルに出すため
  console.log(`${journey.id}\t${journey.file}\t${journey.kind}`);
}
