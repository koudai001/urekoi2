import { apiClient } from "./api-client";

// プロフィール未作成（404）なら null を返す
export async function fetchMyProfile() {
  const res = await apiClient.api.myprofile.$get();
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GET /api/myprofile failed (${res.status})`);
  return res.json();
}
