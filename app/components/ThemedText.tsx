import React from "react";
import { Text, TextProps, useTheme, DefaultTheme } from "react-native-paper";
import { TextStyle, StyleProp } from "react-native";

// Define allowed variant strings.
type AllowedVariant =
  | "displayLarge"
  | "displayMedium"
  | "displaySmall"
  | "headlineLarge"
  | "headlineMedium"
  | "headlineSmall"
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
type ThemedTextProps = Omit<
  TextProps<AllowedVariant>,
  "variant" | "children"
> & {
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
  const theme = useTheme<typeof DefaultTheme>();

  return (
    <Text variant={variant as any} style={style} {...props}>
      {children}
    </Text>
  );
};

export default ThemedText;
