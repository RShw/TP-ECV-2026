import { Tabs } from "expo-router";
import UserProvider from "@/providers/StateProvider";

export default function RootLayout() {
  return (
    <UserProvider>
        <Tabs 
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="index" options={{href: null}} />
      </Tabs>
    </UserProvider>
  )
}
