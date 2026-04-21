import { Text, FlatList, ActivityIndicator, TextInput, View, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function Index() {

  const INIT_TASK_LIST = Array.from({ length: 10 }, (_, i) => `Task ${i + 1}`);

  const [taskList, setTaskList] = useState<string[]>(INIT_TASK_LIST);
  const [task, setTask] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const addTask = (task: string) => {
    setTaskList([...taskList, task]);
    setTask("");
  };

  const showLoader = () => {
    setIsLoading(!isLoading);
  };

  const Header = () => {
    return (
      <>
      <TextInput 
        value={task}
        onChangeText={setTask}
        placeholder="Add a task"
        style={{
          borderWidth: 1,
          borderColor: "black",
          width: "100%",
          height: 40,
          padding: 10,
          borderRadius: 10,
        }}
      />
      <TouchableOpacity
        onPress={() => addTask(task)}
        disabled={task.length === 0}
      >
        <Text>AddTask</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => showLoader()}
      >
        <Text>SHow Loader</Text>
      </TouchableOpacity>
      </>
    );
  };

  const Footer = () => {

    if (!isLoading) return null;

    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList 
        data={taskList}
        renderItem={({ item }) => <Text>{item}</Text>}
        ListHeaderComponent={<Header />}
        ListFooterComponent={<Footer />}
      />
    </View>
  );
}
