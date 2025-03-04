import React from "react";
import { Button, useTheme, ButtonProps } from "react-native-paper";
import { StyleProp, ViewStyle, TextStyle } from "react-native";
import { theme as customTheme } from "@/themes/theme"; // Import custom theme

type ThemedButtonProps = ButtonProps & {
  buttonTheme?: "primary" | "secondary" | "text"; // Renamed to avoid conflict
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

const ThemedButton: React.FC<ThemedButtonProps> = ({
  buttonTheme = "primary", // Default to "primary"
  style,
  labelStyle,
  children,
  ...props
}) => {
  const paperTheme = useTheme(); // Get the theme from the provider

  // Define dynamic button styles based on the `buttonTheme` prop
  const dynamicStyles = {
    primary: {
      backgroundColor: paperTheme.colors.primary,
    },
    secondary: {
      borderColor: paperTheme.colors.accent,
    },
    text: {
      // No additional styles for "text" mode
    },
  };

  return (
    <Button
      mode={
        buttonTheme === "primary"
          ? "contained"
          : buttonTheme === "secondary"
          ? "outlined"
          : "text"
      }
      style={[dynamicStyles[buttonTheme], style]} // Merge dynamic and custom styles
      labelStyle={labelStyle} // Apply custom text styles
      theme={customTheme} // Apply the custom theme
      {...props}
    >
      {children}
    </Button>
  );
};

export default ThemedButton;
