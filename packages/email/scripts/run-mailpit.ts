import { spawn, spawnSync } from "node:child_process";
import net from "node:net";
import process from "node:process";

const SMTP_PORT = 1800;
const UI_PORT = 8801;
const HOST = "127.0.0.1";

/** 既に誰かが SMTP ポートで待ち受けていれば true。二重起動を避けるために使う。 */
const isPortInUse = (port: number): Promise<boolean> =>
  new Promise((resolve) => {
    const socket = net.createConnection({ host: HOST, port });
    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.once("error", () => resolve(false));
  });

const hasMailpit = (): boolean =>
  spawnSync("mailpit", ["version"], { stdio: "ignore" }).error === undefined;

if (await isPortInUse(SMTP_PORT)) {
  console.log(
    `[mailpit] ポート ${SMTP_PORT} は使用中です。起動済みとみなします（受信箱: http://localhost:${UI_PORT}）`,
  );
  process.exit(0);
}

if (!hasMailpit()) {
  console.error(
    "[mailpit] mailpit が見つかりません。`brew install mailpit` でインストールしてください",
  );
  process.exit(1);
}

console.log(
  `[mailpit] 起動します（SMTP: ${HOST}:${SMTP_PORT} / 受信箱: http://localhost:${UI_PORT}）`,
);

const child = spawn(
  "mailpit",
  ["--smtp", `${HOST}:${SMTP_PORT}`, "--listen", `${HOST}:${UI_PORT}`],
  { stdio: "inherit" },
);

// Ctrl+C を子プロセスにも伝え、mailpit を残さない。
for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => child.kill(signal));
}

child.on("exit", (code) => process.exit(code ?? 0));
