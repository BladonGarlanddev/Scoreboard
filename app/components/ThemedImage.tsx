import { Image, StyleSheet } from "react-native";
import React from "react";

type ThemedImageProps = {
  source: any; // Adjust type as needed
  style?: object;
  type: "icon" | "image";
};

const ThemedImage: React.FC<ThemedImageProps> = ({ source, style, type }) => {
  return (
    <Image
      source={source}
      style={[styles.image, style]} // ✅ Uses cached styles
      resizeMode={"contain"} // ✅ Applied correctly as a prop
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%", // ✅ Centers the image horizontally
  },
});

export default ThemedImage;
