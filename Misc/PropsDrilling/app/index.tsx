import { View } from "react-native";
import { Comp1 } from "../components/Comp1";
import { CompX } from "../components/CompX";
import UserProvider from "@/provider/UserProvider";

export default function Index() {
  return (
    <UserProvider>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Comp1 />
        <View style={{ height: 80 }} />
        <CompX />
      </View>
    </UserProvider>
  );
}
