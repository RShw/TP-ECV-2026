import { Text, View } from "react-native";
import { useUserContext } from "@/provider/UserProvider";

export function CompZ() {

  const UserValue = useUserContext()

  return (
    <View>
      <Text>CompZ {UserValue.surname} {UserValue.name}</Text>
    </View>
  );
}

