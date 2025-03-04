import { useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { usePathname } from "expo-router";
import { Stack, Link } from "expo-router";
import { ThemedText, ThemedView } from "@/components/index"; // Adjust the path as needed
import { StyleSheet } from "react-native";

type NotFoundScreenParams = {
  path?: string; // 'path' is optional
};

export default function NotFoundScreen() {
  const route = useRoute<RouteProp<{ params: NotFoundScreenParams }>>();
  const pathname = usePathname(); // Get the current path

  // Use pathname as the attempted path if available
  const attemptedPath = route.params?.path || pathname || "unknown";

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView style={styles.container}>
        <ThemedText type='title'>This screen doesn't exist.</ThemedText>
        <ThemedText>
          Attempted route:{" "}
          <ThemedText type='defaultSemiBold'>{attemptedPath}</ThemedText>
        </ThemedText>
        <Link href='/' style={styles.link}>
          <ThemedText type='link'>Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 20,
  },
});
