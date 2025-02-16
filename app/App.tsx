import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Provider as PaperProvider, DefaultTheme, Paragraph } from "react-native-paper";
import AppNavigator from '@/app/navigation/AppNavigator';
import { theme } from '@/app/themes/theme';
import { Provider } from 'react-redux';
import { store } from '@/app/store/store';

export default function App() {
  return (
    <SafeAreaView>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <AppNavigator/>
        </PaperProvider>
      </Provider>
    </SafeAreaView>
  );
}

