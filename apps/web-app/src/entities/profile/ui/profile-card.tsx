import { getPrefectureName } from "@urekoi/core";
import { calculateAge } from "@urekoi/core/domain/profile";
import type { InferResponseType } from "hono/client";
import type { apiClient } from "../../../shared/api/api-client";
import { getDummyImage } from "../lib/dummy-image";

type SearchProfile = InferResponseType<
  typeof apiClient.api.search.$get,
  200
>["profiles"][number];

// 写真と、判断に必要なプロフィールの概要をコンパクトに表示する
export function ProfileCard({ profile }: { profile: SearchProfile }) {
  const [year, month, day] = profile.birthdate.split("-").map(Number);
  const age = calculateAge(year, month, day);
  const prefectureName = getPrefectureName(profile.prefectureCode);
  const imageUrl = getDummyImage(profile.id);

  return (
    <div className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border">
      <img
        src={imageUrl}
        alt={`${profile.nickname}さんの写真`}
        className="aspect-square w-full object-cover"
      />
      <div className="space-y-1 px-3 py-2">
        <p className="flex min-w-0 items-baseline gap-1">
          <span className="shrink-0 text-base font-bold">{age}歳</span>
          <span className="truncate text-sm font-semibold">
            {prefectureName}
          </span>
        </p>
        <p className="truncate text-sm text-muted-foreground">
          {profile.occupation || "職業未設定"}
        </p>
        <p className="truncate text-sm text-muted-foreground">
          {profile.bio || "よろしくお願いします"}
        </p>
      </div>
    </div>
  );
}
