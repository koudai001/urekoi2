import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

export const queryClient = new QueryClient({
  defaultOptions: {
    // 1分間キャッシュする&1回だけリトライする
    queries: { staleTime: 1000 * 60, retry: 1 },
  },
});

// アプリ全体のプロバイダをまとめる
export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
