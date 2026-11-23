import { getPrefectureName } from "@urekoi/core";
import { calculateAge } from "@urekoi/core/domain/profile";
import type { InferResponseType } from "hono/client";
import { View } from "react-native";
import type { apiClient } from "@/shared/api/api-client";
import { AppImage } from "@/shared/ui/app-image";
import { AppText } from "@/shared/ui/app-text";
import { Card, CardContent } from "@/shared/ui/card";
import { getDummyImage } from "../lib/dummy-image";

type SearchProfile = InferResponseType<
  typeof apiClient.api.search.$get,
  200
>["profiles"][number];

export function ProfileCard({
  profile,
}: {
  profile: Pick<
    SearchProfile,
    "id" | "nickname" | "birthdate" | "prefectureCode" | "occupation" | "bio"
  >;
}) {
  const image = getDummyImage(profile.id);
  const [year, month, day] = profile.birthdate.split("-").map(Number);
  const age = calculateAge(year, month, day);
  const prefectureName = getPrefectureName(profile.prefectureCode);

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <AppImage
        source={image}
        accessibilityLabel={`${profile.nickname}さんの写真`}
        className="aspect-square w-full"
      />
      <CardContent className="gap-1 px-3 py-2">
        <View className="flex-row items-baseline gap-1">
          <AppText className="font-bold">{age}歳</AppText>
          <AppText className="flex-1 text-sm font-semibold" numberOfLines={1}>
            {prefectureName}
          </AppText>
        </View>
        <AppText className="text-sm text-muted-foreground" numberOfLines={1}>
          {profile.occupation || "職業未設定"}
        </AppText>
        <AppText className="text-sm text-muted-foreground" numberOfLines={1}>
          {profile.bio || "よろしくお願いします"}
        </AppText>
      </CardContent>
    </Card>
  );
}
