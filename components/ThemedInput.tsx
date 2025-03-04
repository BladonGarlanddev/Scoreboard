import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { theme } from "../themes/theme";
import { useMemo } from "react";
import React from "react";

type ThemedInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: boolean;
  mode?: "outlined" | "flat";
  style?: object;
  onFocus?: () => void;
};

const ThemedInput: React.FC<ThemedInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error = false,
  mode = "outlined",
  style = {},
  onFocus
}) => {
  // ✅ Use memoization to prevent styles from being recreated on every render
  const styles = useMemo(() => getStyles(mode), [mode]);

  return (
    <View style={styles.view}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        error={error}
        mode={mode}
        style={[styles.input, style]}
        onFocus={onFocus}
      />
    </View>
  );
};

// ✅ Ensure `getStyles` is a regular function, not executed inside JSX
const getStyles = (mode: "outlined" | "flat") =>
  StyleSheet.create({
    input: {
      backgroundColor: mode === "flat" ? theme.colors.accent : "transparent",
      alignSelf: "stretch",
    },
    view: {
      height: theme.spacing(6),
      justifyContent: "center", // ✅ Ensures content is aligned properly
      alignSelf: "stretch", // ✅ Ensures width is consistent
    },
  });

export default ThemedInput;
