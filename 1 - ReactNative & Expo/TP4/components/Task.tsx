import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import React, {useContext} from 'react'
import { TaskListContext } from '../providers/TaskProvider';

type TaskProps = {
    task: string;
    index: number;
}

const Task = ({
    task,
    index
}: TaskProps) => {

  const {
    deleteTask
  } = useContext(TaskListContext)

  return (
    <TouchableOpacity 
      onPress={() => deleteTask(index)}
      style={styles.task}
    >
        <Text>{task}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    task: {
        padding: 12,
        borderBottomWidth: 1,
        borderColor: "grey",
    }
})

export default Task



