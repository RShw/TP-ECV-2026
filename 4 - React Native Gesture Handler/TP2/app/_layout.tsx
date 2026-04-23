import { Tabs } from "expo-router";
import UserProvider from "@/providers/UserProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <UserProvider>
          <Tabs 
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tabs.Screen name="index" options={{href: null}} />
        </Tabs>
      </UserProvider>
    </GestureHandlerRootView>
  )
}
