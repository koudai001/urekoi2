## 技術構成(monorepo)

```
apps/
  web-app/       SPAの静的配信: React / TanStack Router / TanStack Query / react-hook-form
  workers-api/   API: Hono / Cloudflare Workers / Drizzle ORM / Turso(libSQL、マルチリージョンread replica) / better-auth
packages/
  core/          web-app/workers-api共通の定数・型
  email/         メール送信
  logger/        ログ（console + Sentry）
```

- infra: Cloudflare Workers（同一オリジン）
- tools: Turborepo / Biome / Sentry / GTM

## workers-api構成(レイヤードアーキテクチャ)

```
api/<name>/          HTTP層
  index.ts           ルートの登録（共通ミドルウェアもここ）
  post.ts など       1エンドポイント1ファイル（route と handler）
  post.test.ts など  エンドポイントのテスト
  schema.ts          zod（リクエスト・レスポンスの形）

application/<name>/
  service.ts         業務ロジック
  repository.ts      DBアクセス

lib/                 共通処理
middleware/          共通ミドルウェア
db/schema/           1テーブル1ファイル
```

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
- `createApp({ db })` にテスト用DBを渡し、APIは `c.var.db` を使う。
