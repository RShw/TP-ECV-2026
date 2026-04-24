import { useUserContext } from "@/provider/UserProvider";
import { Text, View } from "react-native";

export function Comp3() {

  const UserValue = useUserContext()

  return (
    <View>
      <Text>Comp3 {UserValue.surname}</Text>
    </View>
  );
}

