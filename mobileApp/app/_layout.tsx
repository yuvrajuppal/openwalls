import "../global.css";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ToastProvider } from "react-native-toast-notifications";
import { UserProvider } from "../context/UserContext";

export default function RootLayout() {
  return (
    <ToastProvider>
      <UserProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaView>
      </UserProvider>
    </ToastProvider>
  );
}
