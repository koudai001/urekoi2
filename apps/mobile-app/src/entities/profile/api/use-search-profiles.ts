import { useInfiniteQuery } from "@tanstack/react-query";
import * as commonLabel from "@urekoi/core/labels/common";
import * as searchLabel from "@urekoi/core/labels/search";
import { apiClient } from "@/shared/api/api-client";
import { queryKeys } from "@/shared/api/query-keys";

// お相手の一覧を新しい順に取得し、続きはカーソルで読み込む
export function useSearchProfiles() {
  const query = useInfiniteQuery({
    queryKey: queryKeys.search,
    queryFn: async ({ pageParam }) => {
      const res = await apiClient.api.search.$get({
        query: pageParam ? { cursor: pageParam } : {},
      });
      if (!res.ok) {
        switch (res.status) {
          case 400:
            throw new Error(searchLabel.invalidCursor);
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
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  // ページごとの配列を1つにつなげる
  const profiles = query.data?.pages.flatMap((page) => page.profiles) ?? [];

  return { ...query, profiles };
}
