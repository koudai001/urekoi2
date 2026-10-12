import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomBar } from "../components/ui/bottom-bar";

// 探す・いいね・メッセージ・マイページ共通のレイアウト。下部にタブナビゲーションを表示する
export const Route = createFileRoute("/_app")({
  component: () => (
    <div className="flex min-h-svh flex-col">
      <div className="flex-1">
        <Outlet />
      </div>
      <BottomBar />
    </div>
  ),
});
