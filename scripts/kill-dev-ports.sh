#!/bin/bash
set -euo pipefail

# 開発サーバーで利用するポートに紐づくプロセスを終了するユーティリティ

if ! command -v lsof >/dev/null 2>&1; then
  echo "lsof が見つかりません。lsof をインストールしてください。" >&2
  exit 1
fi

DEFAULT_PORTS=(
  "5300" # web-app（vite）
  "8800" # workers-api（wrangler）
  "8081" # mobile-app（expo）
  "1800" # Mailpit SMTP
  "8801" # Mailpit 受信箱
)

if [ "$#" -gt 0 ]; then
  PORTS=("$@")
else
  PORTS=("${DEFAULT_PORTS[@]}")
fi

killed_any=false

for raw_port in "${PORTS[@]}"; do
  port="$(echo "$raw_port" | tr -d '[:space:]')"
  if [ -z "$port" ]; then
    continue
  fi

  pids="$(lsof -ti:"${port}" 2>/dev/null || true)"
  if [ -n "$pids" ]; then
    echo "Port ${port} を使用しているプロセス (${pids}) を終了します"
    while read -r pid; do
      if [ -z "$pid" ]; then
        continue
      fi

      if kill "$pid" 2>/dev/null; then
        continue
      fi
      kill -9 "$pid" 2>/dev/null || true
    done <<< "$pids"
    killed_any=true
  else
    echo "Port ${port} は空いています"
  fi
done

if [ "$killed_any" = true ]; then
  echo "指定したポートを解放しました"
else
  echo "終了すべきプロセスは見つかりませんでした"
fi
