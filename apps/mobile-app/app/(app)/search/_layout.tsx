import { Stack } from "expo-router";

// 検索タブの中の画面（一覧 → 詳細）
export default function SearchLayout() {
  return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: "minimal" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{ title: "" }} />
    </Stack>
  );
}
