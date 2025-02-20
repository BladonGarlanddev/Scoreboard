import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Provider as PaperProvider, DefaultTheme, Paragraph } from "react-native-paper";
import AppNavigator from '@/navigation/AppNavigator';
import { theme } from '@/themes/theme';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export default function App() {
  const [fontsLoaded] = useFonts({
    "BebasNeue-Regular": require("./assets/fonts/BebasNeue-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync(); // ⏳ Keep splash screen visible
      if (fontsLoaded) {
        await SplashScreen.hideAsync(); // ✅ Hide splash screen when fonts are ready
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Prevent rendering until fonts are loaded
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <PaperProvider theme={theme}>
            <AppNavigator />
        </PaperProvider>
      </Provider>
    </SafeAreaView>
  );
}

