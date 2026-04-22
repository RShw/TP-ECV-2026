import { randomColor, randomInt} from "@/helpers";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Card from "./components/Card";

export type TCard = {
  id: number;
  color: string;
  height: number;
}

const MIN_HEIGHT = 40;
const MAX_HEIGHT = 80;

const CARD_LIST: TCard[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  color: randomColor(),
  height: randomInt(MIN_HEIGHT, MAX_HEIGHT),
}));

export default function Index() {

  const [cardList, setCardList] = useState(CARD_LIST)

  return (
    <View
      style={styles.container}
    >
      <FlatList
        data={cardList}
        renderItem={({ item }: { item: TCard }) => <Card card={item} cardList={cardList} setCardList={setCardList} />}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "lightgray",
  },
  cardContainer: {
    width: "100%",
    borderRadius: 12,
    padding: 8,
  },
  card: {
    width: "100%",
    borderRadius: 12,
    padding: 4,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 4,
    borderRadius: 12,
  },
})
