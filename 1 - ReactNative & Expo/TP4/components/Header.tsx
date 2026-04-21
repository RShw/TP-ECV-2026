import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { TaskListContext } from '../providers/TaskProvider'

const Header = () => {

    const {
        addTask,
        taskList
    } = useContext(TaskListContext)

    const [task, setTask] = useState("");
    const [taskCount, setTaskCount] = useState(taskList.length)

    useEffect(() => {
        setTaskCount(taskList.length)
    }, [taskList])
    
    const addTaskLocal = (task: string) => {
        addTask(task);
        setTask("");
    };

    return (
        <View style={styles.container}>
            <TextInput 
            value={task}
            onChangeText={setTask}
            placeholder="Add a task"
            style={styles.textInput}
            />
            <TouchableOpacity
            onPress={() => addTaskLocal(task)}
            disabled={task.length === 0}
            style={styles.button}
            >
                <Text>AddTask: {taskCount}</Text>
            </TouchableOpacity>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: 100,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingTop: 8,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "black",
        width: "100%",
        height: 40,
        padding: 8,
        borderRadius: 8,
    },
    button: {
        width: "100%",
        backgroundColor: "lightblue",
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        marginTop: 8,
        marginVertical: 8,
    }
})

export default Header