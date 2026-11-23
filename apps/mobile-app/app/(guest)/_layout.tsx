import { Stack } from "expo-router";

// 未ログインの画面（トップ・ログイン・新規登録）
export default function GuestLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerBackButtonDisplayMode: "minimal",
      }}
    />
  );
}
