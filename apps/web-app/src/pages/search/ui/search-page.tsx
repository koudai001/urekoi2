import * as commonLabel from "@urekoi/core/labels/common";
import * as searchLabel from "@urekoi/core/labels/search";
import { useEffect, useRef } from "react";
import { ProfileCard, useSearchProfiles } from "../../../entities/profile";

// お相手の一覧を2列で表示し、下までスクロールしたら続きを読み込む
export function SearchPage() {
  const {
    profiles,
    error,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    fetchNextPage,
  } = useSearchProfiles();
  const bottomRef = useRef<HTMLDivElement>(null);

  // 一番下の目印が見えたら、続きを読み込む
  useEffect(() => {
    const target = bottomRef.current;
    if (!target || !hasNextPage) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isFetchingNextPage) fetchNextPage();
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">
        {commonLabel.loading}
      </p>
    );
  }

  return (
    <main className="px-3 py-4">
      {profiles.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-sm text-muted-foreground">
          {searchLabel.empty}
        </p>
      )}

      {hasNextPage && (
        <div
          ref={bottomRef}
          className="py-6 text-center text-sm text-muted-foreground"
        >
          {isFetchingNextPage ? commonLabel.loading : ""}
        </div>
      )}

      {error && (
        <p className="mt-6 text-center text-sm text-error">{error.message}</p>
      )}
    </main>
  );
}
