import { View, Button, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import { TaskContext, TTask } from '@/providers/TaskProvider'
import { router } from 'expo-router'

const AddTask = () => {

    const { addTask } = useContext(TaskContext)

    const [task, setTask] = useState('')

    const addTaskLocal = () => {
        const newTask: TTask = {
            id: Math.random().toString(),
            id_user: undefined,
            task: task,
        }
        addTask(newTask)
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