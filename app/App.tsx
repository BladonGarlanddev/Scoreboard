import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Provider as PaperProvider, DefaultTheme, Paragraph } from "react-native-paper";
import AppNavigator from '@/navigation/AppNavigator';
import { theme } from '@/themes/theme';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import BebasNeueRegular from "@/assets/fonts/BebasNeue-Regular.ttf";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "BebasNeue-Regular": BebasNeueRegular,
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // or a loading indicator
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

