## 技術構成(monorepo)

```
apps/
  web-app/       SPAの静的配信: React / TanStack Router / TanStack Query / react-hook-form
  mobile-app/    スマホアプリ: Expo
  web-e2e/       web-app の E2E: Playwright
  mobile-e2e/    mobile-app の E2E: Maestro
  workers-api/   API: Hono / Cloudflare Workers / Drizzle ORM / Turso(libSQL、マルチリージョンread replica) / better-auth
packages/
  core/          web-app/workers-api共通の定数・型
  email/         メール送信
  logger/        ログ（console + Sentry）
```

- infra: Cloudflare Workers（web: urekoi.com / API: api.urekoi.com）
- tools: Turborepo / Biome / Sentry / GTM

## workers-api構成(垂直スライス)

```
modules/<機能>/                  1機能1ディレクトリ
  <機能>.routes.ts               機能内のルートをまとめる（共通ミドルウェアもここ）
  <動詞-名詞>.ts                 1エンドポイント1ファイル（zod・route・handler・DBアクセス）
  <動詞-名詞>.test.ts            エンドポイントのテスト
```

例: `modules/myprofile/create-my-profile.ts`

## web-app データフロー

- サーバ状態は TanStack Query のキャッシュに一本化
- ルート（beforeLoad / loader）で取得 → ページはキャッシュから読む
- 更新成功時は対象クエリのみ invalidate

## 認証

- better-authを使用
- パスワードレス（Email OTP）。メールに届いた6桁のコードでログインし、未登録のアドレスならそのまま登録される
- ミドルウェアがリクエストごとにセッションを確認し、無ければ401
- 認証OKなら`userId`をセットして後続のハンドラに渡す

## バリデーション

- zodスキーマをミドルウェアとして差し込む
- リクエストが来た時点で自動検証、失敗したら自動で400(ハンドラ側は検証済みデータを受け取るのみ)

## APIテスト方針

- Node環境で実行する。
- テストごとに一時SQLiteを作り、マイグレーションを適用する。終了後に削除する。
- `createApp({ config, db, auth })` にテスト用DBを渡し、APIは `c.var.db` を使う。

## WAF（Cloudflare ダッシュボード → urekoi.com → Security → WAF）

- Rate limiting `otp-send-limit`：`api.urekoi.com` の `/api/auth/email-otp*` を同一IP 10秒5回超で Block（OTPメールの大量送信対策）
- Custom rule：`api.urekoi.com` の `/api/doc*` を Block（本番で API ドキュメントを隠す）
- Bot Fight Mode：OFF（スマホアプリの API 呼び出しを弾くため）
