import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

export const queryClient = new QueryClient({
  defaultOptions: {
    // 1分間キャッシュする&1回だけリトライする
    queries: { staleTime: 1000 * 60, retry: 1 },
  },
});

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: QueryClient;
  }
}

// ブラウザ拡張の TanStack Query Devtools から見えるようにする（開発中だけ）
if (import.meta.env.DEV) {
  window.__TANSTACK_QUERY_CLIENT__ = queryClient;
}

// アプリ全体のプロバイダをまとめる
export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
