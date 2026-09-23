import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/welcome")({
  component: Welcome,
});

// 初回訪問時に登録・ログインの入口を案内する
function Welcome() {
  return (
    <main className="flex min-h-svh flex-col justify-center gap-12 px-6">
      <header className="flex flex-col items-center text-center">
        <img
          src="/urekoi-icon.png"
          alt="熟恋"
          width={192}
          height={192}
          className="rounded-full shadow-2xl"
        />
        <h1 className="mt-6 text-2xl font-bold">熟恋へようこそ</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          業界初の熟女好き専用アプリ
        </p>
      </header>

      <div className="flex flex-col gap-3">
        <Link
          to="/signup"
          className="flex h-16 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white"
        >
          新しくはじめる（無料）
        </Link>
        <Link
          to="/login"
          className="flex h-16 items-center justify-center rounded-xl border border-border text-lg font-semibold"
        >
          すでに登録されている方はこちら
        </Link>

        <p className="pt-3 text-center text-xs text-muted-foreground">
          <span className="underline underline-offset-2">利用規約</span>、
          <span className="underline underline-offset-2">
            プライバシーポリシー
          </span>
          に同意してはじめる
        </p>
      </div>
    </main>
  );
}
