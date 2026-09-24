import { createFileRoute, Outlet } from "@tanstack/react-router";

// /signup配下(index, profile)の共通レイアウト。中身は各子ルートが持つ
export const Route = createFileRoute("/signup")({
  component: () => <Outlet />,
});
