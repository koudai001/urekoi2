import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Providers, queryClient } from "./app/providers";
import { routeTree } from "./routeTree.gen";
import { loadGoogleTagManager, trackSpaPageViews } from "./shared/lib/gtm";
import { initSentry } from "./shared/lib/sentry";
import { ErrorScreen } from "./shared/ui/error-screen";
import "./globals.css";

initSentry();
// vite build では MODE が "production" になり、本番だけ GTM を読み込む
loadGoogleTagManager(import.meta.env.MODE);

// queryClient は2経路で同じものを渡す（キャッシュを共有するため）
// - context: beforeLoad / loader 用（Reactコンポーネントではないのでフックが使えない）
// - Providers: ページのコンポーネントのフック（useQuery など）用
const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultErrorComponent: ErrorScreen,
});
trackSpaPageViews(router);

// モジュールの型定義を拡張して、ルーターの型を登録する
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("#root が index.html にありません");
}

createRoot(rootElement).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>,
);
