## 技術構成(monorepo)

- 方針: パフォーマンス最優先
- frontend（SPAの静的配信）: React / TanStack Router / TanStack Query / react-hook-form
- backend（API）: Hono / Cloudflare Workers / Drizzle ORM / Turso(libSQL、マルチリージョンread replica) / better-auth
- infra: Cloudflare Workers（同一オリジン）
- shared: frontend/backend共通の定数・型

## backend構成(レイヤードアーキテクチャ)

```
features/<name>/
  index.ts      HTTP層
  service.ts    業務ロジック
  repository.ts DBアクセス
  schema.ts     zod

lib/          共通処理
middlewares/  共通ミドルウェア
db/schema/    1テーブル1ファイル

```

## 認証

- better-authを使用
- ミドルウェアがリクエストごとにセッションを確認し、無ければ401
- 認証OKなら`userId`をセットして後続のハンドラに渡す

## バリデーション

- zodスキーマをミドルウェアとして差し込む
- リクエストが来た時点で自動検証、失敗したら自動で400(ハンドラ側は検証済みデータを受け取るのみ)
