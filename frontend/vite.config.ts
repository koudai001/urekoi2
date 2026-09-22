import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // viteの拡張設定
  plugins: [
    // routerの型定義を自動生成するためのプラグイン(react用)
    // authCodeSplitting：ルートごとにファイルを分割
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    // reactを開発するためのプラグイン（JSXの変換やHMRを有効にする）
    react(),
    // Tailwind CSSのクラスをCSSに変換するプラグイン
    tailwindcss(),
  ],
  // 開発サーバーの設定（本番では使用しない）本番では、Workerが/api/* をHonoに、それ以外をSPAに振り分け
  server: { proxy: { "/api": "http://localhost:8787" } },
});
