import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  // SP専用レイアウト。全ページ共通でスマホ幅に固定する
  component: () => (
    <div className="mx-auto min-h-svh w-full max-w-md">
      {/* URLに対応する子ページが入る */}
      <Outlet />
    </div>
  ),
});
