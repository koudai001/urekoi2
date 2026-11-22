import * as commonLabel from "@urekoi/core/labels/common";

const TIMEOUT_MS = 10_000;

// 10秒で打ち切り、通信の失敗は日本語の文言のエラーにする
export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } catch {
    throw new Error(commonLabel.networkError);
  } finally {
    clearTimeout(timer);
  }
}
