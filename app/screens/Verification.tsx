import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ThemedText from "../components/ThemedText";
import LogoContainer from "../components/LogoContainer";
import { theme } from "@/themes/theme"; // Ensure theme is imported

export default function VerificationPage() {
  const email = useSelector((state: RootState) => state.auth.userMetadata?.email);

  return (
    <View>
      <LogoContainer />
      <ThemedText
        variant='titleLarge'
        style={{ marginVertical: theme.spacing(1) }}
      >
        Verify your account
      </ThemedText>
      <ThemedText
        variant='titleLarge'
        style={{ marginVertical: theme.spacing(1) }}
      >
        An email was sent to {email ? email : "your registered email"}
      </ThemedText>
    </View>
  );
}
