import {
  type InfiniteData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import * as commonLabel from "@urekoi/core/labels/common";
import * as searchLabel from "@urekoi/core/labels/search";
import type { InferResponseType } from "hono/client";
import { apiClient } from "../../../shared/api/api-client";
import { queryKeys } from "../../../shared/api/query-keys";

type SearchPage = InferResponseType<typeof apiClient.api.search.$get, 200>;

// お相手のプロフィールを1件取得する。検索一覧のキャッシュにいれば、それを先に使う
export function useProfile(id: number) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: queryKeys.profile(id),
    queryFn: async () => {
      const res = await apiClient.api.profiles[":id"].$get({
        param: { id: String(id) },
      });
      if (!res.ok) {
        switch (res.status) {
          case 400:
          case 404:
            throw new Error(searchLabel.notFound);
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
    // 検索一覧のキャッシュから、この id の人を探す
    initialData: () =>
      queryClient
        .getQueryData<InfiniteData<SearchPage>>(queryKeys.search)
        ?.pages.flatMap((page) => page.profiles)
        .find((profile) => profile.id === id),
    // 一覧を取った時刻を、そのデータの取得時刻として扱う
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(queryKeys.search)?.dataUpdatedAt,
  });
}
