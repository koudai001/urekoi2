import type { Auth } from "../modules/_shared/auth";

// Authorization: Bearer <userId> を読み、その user をログイン中として返す偽物の auth
export function createTestAuth(): Auth {
  const fake = {
    api: {
      getSession: async ({ headers }: { headers: Headers }) => {
        const userId = headers.get("Authorization")?.replace("Bearer ", "");
        return userId ? { user: { id: userId } } : null;
      },
    },
  };
  return fake as unknown as Auth;
}

// 指定した user としてリクエストするためのヘッダー
export function authHeaders(userId: string) {
  return { Authorization: `Bearer ${userId}` };
}
