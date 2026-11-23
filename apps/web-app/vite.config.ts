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
  // tsconfig.json の paths（@/ → src/）を Vite でも使う
  resolve: {
    tsconfigPaths: true,
  },
  // 開発サーバー。API は proxy せず localhost:8800 を直接呼ぶ（本番と同じ別オリジン）
  server: {
    port: 5300,
    strictPort: true,
  },
});
