import React from "react";
import { Button, useTheme, ButtonProps } from "react-native-paper";
import { StyleProp, ViewStyle, TextStyle } from "react-native";
import { theme } from "@/themes/theme"; // Ensure theme is imported

type ThemedButtonProps = ButtonProps & {
  type?: "primary" | "secondary" | "text";
  style?: StyleProp<ViewStyle>; // Allow custom styles for the button container
  labelStyle?: StyleProp<TextStyle>; // Allow custom styles for the text inside the button
};

const ThemedButton: React.FC<ThemedButtonProps> = ({
  type = "text",
  style,
  labelStyle,
  children,
  ...props
}) => {
  

  // ✅ Define dynamic button styles based on type
  const buttonStyles: StyleProp<ViewStyle> = [
    type === "primary" && { backgroundColor: theme.colors.primary },
    type === "secondary" && {
      borderColor: theme.colors.primary,
      borderWidth: 1,
    },
    type === "text" && { backgroundColor: "transparent" }, // ✅ Only use valid ViewStyle properties
    style, // ✅ Allow users to pass their own styles
  ];

  // ✅ Define dynamic label styles for text
  const buttonLabelStyles: StyleProp<TextStyle> = [
    type === "text" && {
      color: theme.colors.text,
      textDecorationLine: "underline",
    }, // ✅ Text color applied correctly
    labelStyle, // ✅ Allow users to pass their own text styles
  ];

  return (
    <Button
      mode={
        type === "primary"
          ? "contained"
          : type === "secondary"
          ? "outlined"
          : "text"
      }
      style={buttonStyles} // ✅ Merges dynamic and custom styles
      labelStyle={buttonLabelStyles} // ✅ Correctly applies text color
      {...props}
    >
      {children}
    </Button>
  );
};

export default ThemedButton;
