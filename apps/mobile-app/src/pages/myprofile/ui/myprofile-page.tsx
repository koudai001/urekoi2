import { ScrollView } from "react-native";
import { AppText } from "@/shared/ui/app-text";

export function MyprofilePage() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="gap-8 px-8 pt-6"
    >
      <AppText type="title">マイページ</AppText>
    </ScrollView>
  );
}
