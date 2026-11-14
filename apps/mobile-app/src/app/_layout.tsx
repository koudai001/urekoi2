import "@/global.css";

import { DefaultTheme, Stack, ThemeProvider } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </ThemeProvider>
  );
}
