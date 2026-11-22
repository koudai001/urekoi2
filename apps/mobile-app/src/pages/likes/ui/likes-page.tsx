import { ScrollView } from "react-native";
import { AppText } from "@/shared/ui/app-text";

export function LikesPage() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="gap-8 px-8 pt-6"
    >
      <AppText type="title">いいね</AppText>
    </ScrollView>
  );
}
