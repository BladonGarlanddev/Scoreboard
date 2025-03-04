import { Stack } from "expo-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export default function MainLayout() {

  const userData = useSelector((state: RootState) => state.auth.userMetadata)
  const userType = userData?.accountType

  console.log("tabs was rendered");

  return (
    <Stack>
      {userType === "organizer" ? (
        <Stack.Screen name='(organizer)' options={{ headerShown: false }} />
      ) : userType === "athlete" ? (
        <Stack.Screen name='(athlete)' options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name='(staff)' options={{ headerShown: false }} />
      )}
    </Stack>
  );
}
