# mobile-app

スマホアプリ。Expo / Expo Router / Uniwind。

## アーキテクチャ（Feature-Sliced Design）

```
app/             Expo Router のルート（app.json の root で指定）。pages を re-export するだけ
src/
  app/           初期化: Providers・global.css
  pages/         ページ本体（top / signup / login）
  widgets/       画面の大きな部品
  features/      ユーザー操作の単位
  entities/      ドメインの型・サーバ状態
  shared/        ドメイン非依存（ui / lib）
```

- import は `app → pages → widgets → features → entities → shared` の下方向のみ
- 同じ層の slice 同士は import しない
- slice は `index.ts` 経由で使う
- ルートを `src/app` でなく直下の `app/` に置くのは、FSD の `app` 層と名前がぶつかるため
