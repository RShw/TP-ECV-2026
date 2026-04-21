import { Text, ScrollView, TextInput, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";

export default function Index() {

  const INIT_TASK_LIST = Array.from({ length: 100 }, (_, i) => `Task ${i + 1}`);

  const [taskList, setTaskList] = useState<string[]>(INIT_TASK_LIST);
  const [task, setTask] = useState("");

  const addTask = (task: string) => {
    setTaskList([...taskList, task]);
    setTask("");
  };

  useEffect(() => {
    console.log(task);
  }, [task]);

  useEffect(() => {
    console.log(taskList);
  }, [taskList]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <ScrollView>
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
      {taskList.map((task, index) => (
        <Text key={index}>{task}</Text>
      ))}
      </ScrollView>
    </View>
  );
}
