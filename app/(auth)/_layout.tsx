import { Stack } from "expo-router";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function AuthLayout() {
  
  const isVerified = useSelector((state: RootState) => state.auth.isVerified)

  console.log("auth was rendered")

  return (
    <Stack>
      {isVerified ? (
        <Stack.Screen name='login' options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name='verification' options={{ headerShown: false }} />
      )}
      
    </Stack>
  );
}
