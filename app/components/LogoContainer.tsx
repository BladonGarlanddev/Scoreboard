import { ThemedImage, ThemedText } from "@/components/index";
import { View, Image, StyleSheet } from "react-native";
import { theme } from "@/themes/theme"
import logo from "@/assets/images/logo.png";

const { width: intrinsicWidth, height: intrinsicHeight } =
  Image.resolveAssetSource(logo);

export default function LogoContainer() {
  
  return (
    <View style={styles.logoContainer}>
      <ThemedImage source={logo} style={styles.logo} type={"image"} />

      {/* logo text container*/}
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          alignItems: "center",
          maxHeight: 60
        }}
      >
        <View style={styles.line} />
        <ThemedText style={{ marginHorizontal: theme.spacing(1) }}>
          Athletics
        </ThemedText>
        <View style={styles.line} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
  },
  logo: {
    height: intrinsicHeight,
  },
  line: {
      height: 1, // Line thickness
      backgroundColor: theme.colors.black, // Line color
      width: 60,
  },
});
