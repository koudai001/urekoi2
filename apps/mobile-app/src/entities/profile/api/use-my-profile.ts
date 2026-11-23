import { useQuery } from "@tanstack/react-query";
import * as commonLabel from "@urekoi/core/labels/common";
import { apiClient } from "@/shared/api/api-client";
import { queryKeys } from "@/shared/api/query-keys";

// 自分のプロフィールを取得する。未作成（404）なら null
export function useMyProfile({ enabled }: { enabled: boolean }) {
  return useQuery({
    queryKey: queryKeys.myprofile,
    queryFn: async () => {
      const res = await apiClient.api.myprofile.$get();
      if (!res.ok) {
        switch (res.status) {
          case 404:
            return null;
          case 500:
            throw new Error(commonLabel.serverError);
          default: {
            // 想定していないステータスが増えたら、型エラーで気づけるようにする
            const _exhaustiveCheck: never = res;
            throw new Error(`Unexpected status code: ${_exhaustiveCheck}`);
          }
        }
      }
      return res.json();
    },
    enabled,
  });
}
