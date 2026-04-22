import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { router } from 'expo-router'
import { TTask } from '@/providers/TaskProvider'
import { TUser, UserContext } from '@/providers/StateProvider'

const TaskItem = ({ task }: { task: TTask }) => {

  const { listUser } = useContext(UserContext)

  const [user, setUser] = useState<TUser | undefined>(undefined)

    useEffect(() => {
      const user = listUser.find(user => user.id.toString() === task.id_user)
      setUser(user)
  }, [task, listUser])

    const handlePress = () => {
        router.navigate(`/task/task/${task.id}`)
    }

    const handleUpdate = () => {
        router.navigate(`/task/updateTask/${task.id}`)
    }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.containerRow}>
        <View style={styles.taskDescriptionContainer}>
          <Text>{task.task}</Text>
          {user && <Text>{user.name}</Text>}
        </View>
        <View style={styles.userActionContainer}>
          <TouchableOpacity onPress={handleUpdate}>
              <Text>Upd</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderBottomWidth: 1,
        borderColor: "grey",
    },
    containerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    taskDescriptionContainer: {
    },
    userActionContainer: {
        backgroundColor: "white",
        borderRadius: 9999,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
    },
})

export default TaskItem