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
    black: "#21201C",
  },
  roundness: 15, // Global border radius for components
  spacing: (multiplier: number) => BASE_SPACING_UNIT * multiplier,
  fonts: {
    titleLarge: {
      fontSize: BASE_SPACING_UNIT * 6,
      fontFamily: "BebasNeue-Regular",
      color: "#21201C",
    },
    titleMedium: {
      fontSize: BASE_SPACING_UNIT * 5,
      fontFamily: "BebasNeue-Regular",
      color: "#21201C",
    },
    titleSmall: {
      fontSize: BASE_SPACING_UNIT * 4,
      fontFamily: "BebasNeue-Regular",
      color: "#21201C",
    },
    bodyLarge: {
      fontSize: BASE_SPACING_UNIT * 3,
      fontFamily: "Roboto-Regular",
      color: "#21201C",
    },
    bodyMedium: {
      fontSize: BASE_SPACING_UNIT * 2,
      fontFamily: "Roboto-Regular",
      color: "#21201C",
    },
    bodySmall: {
      fontSize: BASE_SPACING_UNIT * 1.5,
      fontFamily: "Roboto-Regular",
      color: "#49473e",
    },
    labelLarge: { fontSize: BASE_SPACING_UNIT * 3 },
    labelMedium: { fontSize: BASE_SPACING_UNIT * 2.5 },
    labelSmall: { fontSize: BASE_SPACING_UNIT * 2 },
  }
};