/** biome-ignore-all lint/suspicious/noConsole: console のラッパー */
// @sentry/core は peerDependencies（使う側と同じものを共有しないと、初期化済みの Sentry に送れない）
import * as Sentry from "@sentry/core";

export type Payload = { [key: string]: unknown };

// serialize した後の値（JSON にできる値だけ）
type SerializedPayloadValue =
  | number
  | boolean
  | string
  | null
  | Array<SerializedPayloadValue>
  | { [key: string]: SerializedPayloadValue };

type SerializedPayload = { [key: string]: SerializedPayloadValue };

type Level = "trace" | "debug" | "info" | "warn" | "error" | "fatal";

// レベルごとに使う console のメソッド（console.trace / console.fatal は使わない）
const consoleMethod: Record<Level, "debug" | "info" | "warn" | "error"> = {
  trace: "debug",
  debug: "debug",
  info: "info",
  warn: "warn",
  error: "error",
  fatal: "error",
};

// Error はそのままだと JSON にならないので、name / message / stack に分ける
const serialize = (value: unknown): SerializedPayloadValue => {
  if (value === null || value === undefined) return null;
  if (
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "string"
  ) {
    return value;
  }
  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      ...(value.stack ? { stack: value.stack } : {}),
    };
  }
  if (Array.isArray(value)) return value.map(serialize);
  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, serialize(v)]),
    );
  }
  return String(value);
};

const serializePayload = (
  payload: Payload | undefined,
): SerializedPayload | undefined =>
  payload === undefined
    ? undefined
    : Object.fromEntries(
        Object.entries(payload).map(([k, v]) => [k, serialize(v)]),
      );

// payload の中から最初の Error を探す（Issues にスタックトレースを残すため）
const findFirstError = (payload: Payload | undefined): Error | undefined =>
  payload === undefined
    ? undefined
    : Object.values(payload).find((v): v is Error => v instanceof Error);

// 全レベルを Sentry の Logs に送り、error / fatal は Issues にも送る
const log = (level: Level, message: string, rawPayload?: Payload): void => {
  const payload = serializePayload(rawPayload);

  console[consoleMethod[level]]({ message, payload });
  Sentry.logger[level](message, payload);

  if (level === "error" || level === "fatal") {
    Sentry.withScope((scope) => {
      scope.setLevel(level);
      if (payload) scope.setExtras(payload);
      Sentry.captureException(findFirstError(rawPayload) ?? new Error(message));
    });
  }
};

// 使う側は import * as logger from "@urekoi/logger" で logger.error(...) と呼ぶ
export const trace = (message: string, payload?: Payload) =>
  log("trace", message, payload);
export const debug = (message: string, payload?: Payload) =>
  log("debug", message, payload);
export const info = (message: string, payload?: Payload) =>
  log("info", message, payload);
export const warn = (message: string, payload?: Payload) =>
  log("warn", message, payload);
export const error = (message: string, payload?: Payload) =>
  log("error", message, payload);
export const fatal = (message: string, payload?: Payload) =>
  log("fatal", message, payload);
