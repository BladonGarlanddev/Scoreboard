import React from "react";
import { Text, TextProps, useTheme, DefaultTheme } from "react-native-paper";
import { TextStyle, StyleProp } from "react-native";

// Define allowed variant strings.
type AllowedVariant =
  | "titleLarge"
  | "titleMedium"
  | "titleSmall"
  | "bodyLarge"
  | "bodyMedium"
  | "bodySmall"
  | "labelLarge"
  | "labelMedium"
  | "labelSmall";

// Omit 'variant' and 'children' from TextProps so we can re-declare them.
type ThemedTextProps = {
  variant?: AllowedVariant;
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

const ThemedText: React.FC<ThemedTextProps> = ({
  variant = "bodyMedium", // Ensure this key exists in your theme's fonts.
  children,
  style,
  ...props
}) => {
  // Use 'typeof DefaultTheme' to correctly type the theme.
  const theme = useTheme();

  return (
    <Text style={[style, theme.fonts[variant]]} {...props}>
      {children}
    </Text>
  );
};

export default ThemedText;
