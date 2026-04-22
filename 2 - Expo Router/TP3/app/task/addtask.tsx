import { View, Button, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import { TaskContext } from '@/providers/TaskProvider'
import { router } from 'expo-router'

const AddTask = () => {

    const { addTask } = useContext(TaskContext)

    const [task, setTask] = useState('')

    const addTaskLocal = () => {
        console.log("addTaskLocal", task)
        addTask(task)
        setTask('')
        router.navigate('../')
    }

  return (
    <View>
        <TextInput placeholder="Add a task" value={task} onChangeText={setTask} />
        <Button title="Add Task" onPress={addTaskLocal} />
    </View>
  )
}

export default AddTask