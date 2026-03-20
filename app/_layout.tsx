import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
(async () => {
  await NavigationBar.setVisibilityAsync("hidden");
})();

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <SafeAreaView
        edges={{ bottom: "off", top: "maximum", left: "off", right: "off" }}
        style={{ flex: 1, backgroundColor: "black", paddingTop: 50 }}
      >
        <Stack
          screenOptions={{
            title: "",
            headerShown: false,
            header: () => null,
          }}
        ></Stack>
      </SafeAreaView>
    </ThemeProvider>
  );
}
