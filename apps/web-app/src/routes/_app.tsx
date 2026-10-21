import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomBar } from "../components/ui/BottomBar";
import { requireProfiledSession } from "../lib/app-route-auth";

// 探す・いいね・メッセージ・マイページ共通のレイアウト。下部にタブナビゲーションを表示する
export const Route = createFileRoute("/_app")({
  beforeLoad: ({ context }) => requireProfiledSession(context.queryClient),
  component: () => (
    <div className="flex min-h-svh flex-col">
      <div className="flex-1">
        <Outlet />
      </div>
      <BottomBar />
    </div>
  ),
});
