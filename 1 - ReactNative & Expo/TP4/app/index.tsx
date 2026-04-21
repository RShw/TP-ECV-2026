import { View } from "react-native";
import TaskList from "../components/TaskList";
import TaskProvider from "../providers/TaskProvider";

export default function Index() {

  return (
    <TaskProvider>
      <View
        style={{
          flex: 1,
        }}
      >
        <TaskList />
      </View>
    </TaskProvider>
  );
}
