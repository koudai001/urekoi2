import { createFileRoute, Outlet } from "@tanstack/react-router";
import { requireProfiledSession } from "../app/route-auth";
import { BottomBar } from "../widgets/bottom-bar";

// 探す・いいね・メッセージ・マイページ共通のレイアウト。下部にタブナビゲーションを表示する
export const Route = createFileRoute("/_app")({
  beforeLoad: ({ context }) => requireProfiledSession(context.queryClient),
  component: () => (
    <div className="flex h-svh flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <Outlet />
      </div>
      <BottomBar />
    </div>
  ),
});
