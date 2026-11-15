import "@/app/global.css";

import { DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { Providers } from "@/app/providers";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Providers>
      <ThemeProvider value={DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            headerBackButtonDisplayMode: "minimal",
          }}
        />
      </ThemeProvider>
    </Providers>
  );
}
