import { MD3LightTheme as DefaultTheme } from "react-native-paper";

const BASE_SPACING_UNIT = 8;

export const theme = {
  ...DefaultTheme, // Extend default Material Design theme
  colors: {
    primary: "#d3d0bf", // Your main brand color
    accent: "#D4AF37", // Secondary color
    background: "#ECE9DA",
    surface: "#f5f5f5",
    text: "#21201C",
    disabled: "#cfcfcf",
    placeholder: "#757575",
  },
  roundness: 15, // Global border radius for components
  spacing: (multiplier: number) => BASE_SPACING_UNIT * multiplier,
  title: {
    fontSize: 36,
    fontFamily: "BebasNeue-Regular",
    color: "#21201C",
  },
  subtitle: {
    fontSize: 32,
    fontFamily: "BebasNeue-Regular",
    color: "#21201C",
  },
  paragraph: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    color: "#21201C",
  },
  paragraphMedium: {
    fontSize: 14,
    fontFamily: "Roboto-Medium",
    color: "#21201C",
  },
};