import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, MessageCircle, Search, UserRound } from "lucide-react";

const navigationItems = [
  { to: "/search", label: "探す", icon: Search },
  { to: "/likes/pending", label: "いいね", icon: Heart },
  { to: "/messages", label: "メッセージ", icon: MessageCircle },
  { to: "/myprofile", label: "マイページ", icon: UserRound },
] as const;

// 探す・いいね・メッセージ・マイページ間を行き来するタブナビゲーション
export function BottomBar() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <nav aria-label="メインナビゲーション" className="px-3 pb-3 pt-2">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around rounded-2xl border border-border shadow-lg">
        {navigationItems.map(({ to, label, icon: Icon }) => {
          const active = pathname.startsWith(to);

          return (
            <Link
              key={to}
              to={to}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              className={`flex min-w-14 flex-col items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="size-6" aria-hidden="true" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
