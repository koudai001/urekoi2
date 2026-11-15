import * as authLabel from "@urekoi/core/labels/auth";
import { Link, Stack } from "expo-router";
import { ScrollView } from "react-native";
import { Button } from "@/shared/ui/button";
import { Text } from "@/shared/ui/text";

export function LoginPage() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="gap-3 px-8 pt-6"
    >
      <Stack.Screen
        options={{ headerShown: true, title: authLabel.login.title }}
      />
      <Link href="/login/email" asChild>
        <Button variant="outline" className="h-12 rounded-xl bg-white">
          <Text className="text-base">{authLabel.login.withEmail}</Text>
        </Button>
      </Link>
    </ScrollView>
  );
}
