import { View } from "react-native";
import { TopButton } from "@/components/top/top-button";
import { AppImage } from "@/components/ui/app-image";
import { AppText } from "@/components/ui/app-text";

export default function Index() {
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
        <TopButton variant="signup" title="新しくはじめる（無料）" />
        <TopButton variant="login" title="すでに登録されている方はこちら" />
      </View>
    </View>
  );
}
