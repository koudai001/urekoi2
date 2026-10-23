import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Providers, queryClient } from "./app/providers";
import { loadGoogleTagManager, trackSpaPageViews } from "./lib/gtm";
import { routeTree } from "./routeTree.gen";
import "./globals.css";

// vite build では MODE が "production" になり、本番だけ GTM を読み込む
loadGoogleTagManager(import.meta.env.MODE);

// queryClient は2経路で同じものを渡す（キャッシュを共有するため）
// - context: beforeLoad / loader 用（Reactコンポーネントではないのでフックが使えない）
// - Providers: ページのコンポーネントのフック（useQuery など）用
const router = createRouter({ routeTree, context: { queryClient } });
trackSpaPageViews(router);

// モジュールの型定義を拡張して、ルーターの型を登録する
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>,
);
