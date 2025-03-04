import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ThemedText, ThemedButton } from "@/components/index"; // Adjust path as needed
import LogoContainer from "@/components/LogoContainer";
import { theme } from "@/themes/theme"; // Ensure theme is imported
import { account } from "@/lib/appClient"; // Adjust path as needed
import * as Linking from "expo-linking";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyEmailSuccess, verifyEmailFailure } from "@/store/slices/authSlice";

export default function VerificationPage() {
  const email = useSelector((state: RootState) => state.auth.userMetadata?.email);
  
  async function resendVerification() {
    const result = await account.createVerification("http://10.0.2.2/v1");
    console.log("Verification sent. Result:", result);
  }

  const dispatch = useDispatch();

  const handleDeepLink = async (event: { url: string }) => {
    const { queryParams } = Linking.parse(event.url);

    if (queryParams && queryParams.userId && queryParams.secret) {
      const userId = String(queryParams.userId);
      const secret = String(queryParams.secret);

      try {
        // Use Appwrite's updateVerification method to verify the user
        await account.updateVerification(userId, secret);
        dispatch(verifyEmailSuccess()); // Dispatch success action
      } catch (error) {
        console.error("Verification failed:", error);
        dispatch(verifyEmailFailure());
      }
    }
  };

  let subscription: { remove: () => void };

  useEffect(() => {
    subscription = Linking.addEventListener("url", handleDeepLink);
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.verificationPage}>
      <LogoContainer />
      <View style={styles.textContainer}>
        <ThemedText
          variant='titleLarge'
          style={{ marginVertical: theme.spacing(1) }}
        >
          Verify your account
        </ThemedText>
        <ThemedText
          variant='bodyMedium'
          style={{ marginVertical: theme.spacing(1) }}
        >
          An email was sent to {email ? email : "your registered email"}
        </ThemedText>
        <ThemedText
          variant='bodySmall'
          style={{ marginVertical: theme.spacing(1) }}
        >
          or
        </ThemedText>
        <View style={styles.buttonContainer}>
          <ThemedButton buttonTheme='text' labelStyle={styles.buttonLabel}>
            Try another way
          </ThemedButton>
          <ThemedButton buttonTheme='text' labelStyle={styles.buttonLabel} onPress={resendVerification}>
            Resend verification
          </ThemedButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  verificationPage: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.primary,
  },
  textContainer: {
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row", // ✅ Makes buttons inline
    justifyContent: "center", // ✅ Centers buttons
    alignItems: "center", // ✅ Aligns buttons vertically
    gap: 10, // ✅ Adds spacing between buttons (Alternative: `marginHorizontal` on buttons)
  },
  buttonLabel: {
    fontSize: theme.spacing(1.5),
  },
});
