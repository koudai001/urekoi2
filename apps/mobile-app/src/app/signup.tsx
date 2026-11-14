import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export default function SignupScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="gap-3 px-8 pt-6"
    >
      <Stack.Screen options={{ headerShown: true, title: "" }} />
      <Button variant="outline" className="h-12 rounded-xl bg-white">
        <Text className="text-base">メールアドレスで新規登録</Text>
      </Button>
    </ScrollView>
  );
}
