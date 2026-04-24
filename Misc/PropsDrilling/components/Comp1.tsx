import { Text, View } from "react-native";
import { Comp2 } from "./Comp2";

export function Comp1() {
  return (
    <View>
      <Text>Comp1</Text>
      <Comp2 />
    </View>
  );
}

