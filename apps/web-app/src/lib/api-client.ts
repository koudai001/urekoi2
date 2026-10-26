import { hc } from "hono/client";
import type { AppType } from "@urekoi/workers-api";

// サーバーエラー(500)時に各画面で使い回す共通メッセージ
export const SERVER_ERROR_MESSAGE =
  "サーバーエラーが発生しました。時間をおいて再度お試しください。";

export const apiClient = hc<AppType>("/");
