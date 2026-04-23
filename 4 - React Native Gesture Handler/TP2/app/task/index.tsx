import { View, FlatList, StyleSheet, Button } from 'react-native'
import React, { useContext } from 'react'
import { TaskContext, TTask } from '@/providers/TaskProvider'
import TaskItem from '@/components/TaskItem'
import { router } from 'expo-router'
import SwipeableItem from '@/components/SwipeableItem'

const TaskList = () => {

    const { taskList, deleteTask } = useContext(TaskContext)

    const navigateToAddTask = () => {
        router.navigate('/task/addtask')
    }

    const renderItemSwipeable = ({ item }: { item: TTask }) => {
    
        const handleLongPress = () => {
            if(item?.id_user) {
                router.navigate(`/user/user/${item?.id_user}`)
            }
        }

        return (
            <SwipeableItem 
                item={item} 
                deleteItem={() => deleteTask(item.id)}
                handleLongPress={handleLongPress}
            >
                <TaskItem task={item} />
            </SwipeableItem>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={taskList}
                renderItem={renderItemSwipeable}
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