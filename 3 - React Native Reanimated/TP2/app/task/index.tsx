import { View, FlatList, StyleSheet, Button } from 'react-native'
import React, { useContext } from 'react'
import { TaskContext } from '@/providers/TaskProvider'
import TaskItem from '@/components/TaskItem'
import { router } from 'expo-router'

const TaskList = () => {

    const { taskList } = useContext(TaskContext)

    const navigateToAddTask = () => {
        router.navigate('/task/addtask')
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={taskList}
                renderItem={({ item }) => <TaskItem task={item} />}
            />
            <Button title="Add Task" onPress={navigateToAddTask} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default TaskList