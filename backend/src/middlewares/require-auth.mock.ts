import { createMiddleware } from "hono/factory";

// テストごとに実際に作成したuserのidへ差し替えられるようにする
let currentUserId = "user-1";

export function setCurrentUserId(id: string) {
  currentUserId = id;
}

export const requireAuth = createMiddleware<{
  Variables: { userId: string };
}>(async (c, next) => {
  c.set("userId", currentUserId);
  await next();
});
