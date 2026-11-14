# @urekoi/web-e2e

web-app の E2E テスト。Playwright で iPhone の画面を想定して検証する。

## ジャーニー

- `smoke-home` … トップに見出しと登録・ログインの入口が出る

## 実行

```bash
# 初回だけ（iPhone 用の WebKit を入れる）
pnpm --filter @urekoi/web-e2e exec playwright install webkit

# E2E（web-app は自動で起動する。起動済みなら再利用）
pnpm --filter @urekoi/web-e2e e2e

# 一部だけ
E2E_JOURNEYS=smoke-home pnpm --filter @urekoi/web-e2e e2e
```

## 構成

| パス                 | 役割                                   |
| -------------------- | -------------------------------------- |
| `journeys/`          | ジャーニー（1つの流れ＝1ファイル）     |
| `journeys.config.ts` | ジャーニー台帳（追加時はここにも書く） |
