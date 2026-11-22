import "@/app/global.css";

import { DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { Providers } from "@/app/providers";
import { useAccountStatus } from "@/app/use-account-status";
import { LoadingScreen } from "@/shared/ui/loading-screen";

// アカウントの段階に応じて、表示できる画面のグループを切り替える
function RootNavigator() {
  const status = useAccountStatus();

  if (status === "loading") return <LoadingScreen />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={status === "guest"}>
        <Stack.Screen name="(guest)" />
      </Stack.Protected>
      <Stack.Protected guard={status === "noProfile"}>
        <Stack.Screen name="(onboarding)" />
      </Stack.Protected>
      <Stack.Protected guard={status === "ready"}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Providers>
      <ThemeProvider value={DefaultTheme}>
        <RootNavigator />
      </ThemeProvider>
    </Providers>
  );
}
