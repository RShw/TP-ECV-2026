import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const TaskItem = ({ task }: { task: string }) => {


    const handlePress = () => {
        router.navigate(`/task/task/123`)
    }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text>{task}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderBottomWidth: 1,
        borderColor: "grey",
    },
})

export default TaskItem