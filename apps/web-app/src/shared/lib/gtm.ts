// Google Tag Manager の読み込みと、SPA の画面遷移の計測。本番だけ読み込む
import type { AnyRouter } from "@tanstack/react-router";
import { GOOGLE_TAG_MANAGER_SCRIPT_URL } from "@urekoi/core";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// GTMの読み込み
export const loadGoogleTagManager = (environment: string | undefined): void => {
  if (environment !== "production") return;
  // GTMのスクリプトがすでに読み込まれている場合は何もしない
  if (
    document.querySelector(`script[src="${GOOGLE_TAG_MANAGER_SCRIPT_URL}"]`) !==
    null
  )
    return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.async = true;
  script.src = GOOGLE_TAG_MANAGER_SCRIPT_URL;
  document.head.insertBefore(script, document.head.firstChild);
};

// GTM の dataLayer にイベントを積む。GTM 未読み込み（本番以外）でも配列に積まれるだけで害は無い
export const pushDataLayer = (
  event: string,
  params: Record<string, string> = {},
): void => {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
};

// パスが変わる画面遷移ごとに spa_pageview を積む
// 最初の表示は GTM のページ読み込みで数えるので積まない。送るのはパスだけ（クエリに個人情報が載り得るため）
export const trackSpaPageViews = (
  router: Pick<AnyRouter, "subscribe">,
): (() => void) =>
  router.subscribe(
    "onResolved",
    ({ fromLocation, toLocation, pathChanged }) => {
      if (fromLocation === undefined || !pathChanged) return;
      pushDataLayer("spa_pageview", { page_path: toLocation.pathname });
    },
  );
