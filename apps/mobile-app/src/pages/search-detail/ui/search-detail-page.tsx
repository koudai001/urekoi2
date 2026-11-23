import { getPrefectureName } from "@urekoi/core";
import { calculateAge } from "@urekoi/core/domain/profile";
import * as profileLabel from "@urekoi/core/labels/profile";
import { Stack } from "expo-router";
import { ScrollView, View } from "react-native";
import { getDummyImage, useProfile } from "@/entities/profile";
import { AppImage } from "@/shared/ui/app-image";
import { AppText } from "@/shared/ui/app-text";
import { LoadingScreen } from "@/shared/ui/loading-screen";

const fields = profileLabel.fields;

// 項目名と値を縦に並べる。未設定でも同じ高さで出す
function DetailItem({ label, value }: { label: string; value: string | null }) {
  return (
    <View className="w-1/2 pr-6 pb-5">
      <AppText className="text-sm text-muted-foreground">{label}</AppText>
      <AppText className="mt-1 font-medium" numberOfLines={1}>
        {value || profileLabel.notSet}
      </AppText>
    </View>
  );
}

// 検索から開くお相手の詳細
export function SearchDetailPage({ id }: { id: number }) {
  const { data: profile, error, isPending } = useProfile(id);

  if (isPending) return <LoadingScreen />;

  if (error) {
    return (
      <AppText className="py-16 text-center text-sm text-error">
        {error.message}
      </AppText>
    );
  }

  const [year, month, day] = profile.birthdate.split("-").map(Number);
  const age = calculateAge(year, month, day);
  const prefectureName = getPrefectureName(profile.prefectureCode);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Stack.Screen options={{ title: profile.nickname }} />
      <AppImage
        source={getDummyImage(profile.id)}
        accessibilityLabel={`${profile.nickname}さんの写真`}
        className="aspect-square w-full"
      />
      <View className="px-5 pt-6 pb-6">
        <AppText className="text-3xl font-extrabold">
          {profile.nickname}
        </AppText>
        <AppText className="mt-2 text-lg text-muted-foreground">
          {age}歳 ・ {prefectureName}
        </AppText>

        <View className="mt-8">
          <AppText className="border-b border-border pb-2 text-xl font-bold">
            {profileLabel.bio}
          </AppText>
          <AppText className="mt-4 leading-7">
            {profile.bio || profileLabel.notSet}
          </AppText>
        </View>

        <View className="mt-8">
          <AppText className="border-b border-border pb-2 text-xl font-bold">
            {profileLabel.details}
          </AppText>
          <View className="mt-4 flex-row flex-wrap">
            <DetailItem label={fields.occupation} value={profile.occupation} />
            <DetailItem label={fields.hometown} value={profile.hometown} />
            <DetailItem label={fields.bloodType} value={profile.bloodType} />
            <DetailItem label={fields.mbti} value={profile.mbti} />
            <DetailItem label={fields.bodyType} value={profile.bodyType} />
            <DetailItem label={fields.education} value={profile.education} />
            <DetailItem label={fields.holiday} value={profile.holiday} />
            <DetailItem label={fields.alcohol} value={profile.alcohol} />
            <DetailItem label={fields.smoking} value={profile.smoking} />
            <DetailItem
              label={fields.heightCm}
              value={profile.heightCm ? `${profile.heightCm}cm` : null}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
