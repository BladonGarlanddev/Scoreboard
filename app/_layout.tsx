import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider, useSelector } from "react-redux";
import { store } from "@/store/store";
import { theme } from "@/themes/theme";
import { useColorScheme } from "@/hooks/useColorScheme";
import type { RootState } from "@/store/store";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const AuthStack = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  console.log("isAuthenticated:", isAuthenticated);

  return (
    <Stack>
      {/* Define main screens here */}
      {isAuthenticated ? (
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
      )}
    </Stack>
  );
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    "BebasNeue-Regular": require("@/assets/fonts/BebasNeue-Regular.ttf"),
    //SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <AuthStack />
          <StatusBar style='auto' />
        </ThemeProvider>
      </PaperProvider>
    </Provider>
  );
}
