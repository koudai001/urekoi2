import type { QueryClient } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { fetchMyProfile } from "../entities/profile";
import { authClient } from "../shared/api/auth-client";
import { queryKeys } from "../shared/api/query-keys";

// _app.beforeLoad 用の認証ガード
// 未ログインなら /、プロフィール未作成なら /signup/profile へ
export async function requireProfiledSession(queryClient: QueryClient) {
  const { data } = await authClient.getSession();
  if (data === null) {
    throw redirect({ to: "/" });
  }

  const profile = await queryClient.query({
    queryKey: queryKeys.myprofile,
    queryFn: fetchMyProfile,
  });
  if (profile === null) {
    throw redirect({ to: "/signup/profile" });
  }
}
