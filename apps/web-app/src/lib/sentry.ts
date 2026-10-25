import * as Sentry from "@sentry/react";

export const initSentry = (): void => {
  if (import.meta.env.MODE !== "production") return;
  Sentry.init({
    dsn: "https://0946269f3afb4de438827387ddd84c10@o4512311075405824.ingest.us.sentry.io/4512311113678848",
    environment: import.meta.env.MODE,
    // パフォーマンス計測（ページ読み込み・画面遷移の10%だけ記録する）
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 0.1,
    enableLogs: true,
  });
};
