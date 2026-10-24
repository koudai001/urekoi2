import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

// 全ルートの beforeLoad / loader に渡る context の型（値は main.tsx の createRouter で渡す）
type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  // SP専用レイアウト。全ページ共通でスマホ幅に固定する
  component: () => (
    <div className="mx-auto min-h-svh w-full max-w-md">
      {/* URLに対応する子ページが入る */}
      <Outlet />
    </div>
  ),
});
