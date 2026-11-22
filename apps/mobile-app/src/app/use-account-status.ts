import { useMyProfile } from "@/entities/profile";
import { authClient } from "@/shared/api/auth-client";

type AccountStatus = "loading" | "guest" | "noProfile" | "ready";

// ログイン状態とプロフィールの有無から、アカウントの段階を返す
export function useAccountStatus(): AccountStatus {
  const session = authClient.useSession();
  const isLoggedIn = session.data != null;
  const myProfile = useMyProfile({ enabled: isLoggedIn });

  if (session.isPending) return "loading";
  if (!isLoggedIn) return "guest";
  if (myProfile.isPending) return "loading";
  return myProfile.data ? "ready" : "noProfile";
}
