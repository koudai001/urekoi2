import { Link } from "expo-router";
import { View } from "react-native";
import { AppImage } from "@/shared/ui/app-image";
import { AppText } from "@/shared/ui/app-text";
import { Button } from "@/shared/ui/button";
import { Text } from "@/shared/ui/text";

export function TopPage() {
  return (
    <View className="flex-1 justify-center gap-12 px-6">
      <View className="items-center">
        <View className="rounded-full shadow-2xl">
          <AppImage
            source={require("@/assets/images/urekoi-icon.webp")}
            className="size-48 rounded-full"
          />
        </View>
        <AppText type="title" className="mt-6">
          熟恋へようこそ
        </AppText>
        <AppText className="mt-2">業界初の熟女好き専用アプリ</AppText>
      </View>

      <View className="gap-3">
        <Link href="/signup" asChild>
          <Button className="h-16 rounded-xl">
            <Text className="text-lg">新しくはじめる（無料）</Text>
          </Button>
        </Link>
        <Link href="/login" asChild>
          <Button variant="outline" className="h-16 rounded-xl bg-white">
            <Text className="text-lg">すでに登録されている方はこちら</Text>
          </Button>
        </Link>
      </View>
    </View>
  );
}
