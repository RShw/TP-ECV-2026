import { View, Text, FlatList, TouchableOpacity, TextInput, Button, Modal, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { TUser, UserContext } from '@/providers/UserProvider'
import UserItem from '@/components/UserItem'
import { TaskContext, TTask } from '@/providers/TaskProvider'

const UpdateTask = () => {

  const { listUser } = useContext(UserContext)
  const { taskList, updateTask } = useContext(TaskContext)

  const { id } = useLocalSearchParams()

  const [newTaskDescription, setNewTaskDescription] = useState(taskList.find(task => task.id === id)?.task || '')
  const [modalVisibility, setModalVisibility] = useState(false)
  const [selectedUser, setSelectedUser] = useState<TUser | undefined>(undefined)

  const addUserToItem = () => {
    const newTask: Partial<TTask> = {
      id: id as string || "",
      id_user: selectedUser?.id.toString(),
      task: newTaskDescription,
    }
    updateTask(newTask as TTask)
    router.navigate('../')
  }

  const selectUser = (user: TUser) => {
    setSelectedUser(user)
    setModalVisibility(false)
  }

  const UserItemList = ({ user }: { user: TUser }) => {

    return (
      <TouchableOpacity onPress={() => selectUser(user)}>
        <View pointerEvents="none">
          <UserItem user={user} />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.textInputContainer}>
        <TextInput style={styles.textInput} placeholder="Task" value={newTaskDescription} onChangeText={setNewTaskDescription} />
        </View>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setModalVisibility(true)}
        >
          <Text>Choose User</Text>
        </TouchableOpacity>
      </View>
      {selectedUser ? (
        <View>
          <Text style={styles.selectedUserText}>Selected User: {selectedUser?.name}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.selectedUserText}>No user selected</Text>
        </View>
      )}
      <Button title="Update Task" onPress={addUserToItem} />
      <Modal
        visible={modalVisibility}
        animationType="slide"
      >
        <FlatList
          data={listUser}
          renderItem={({ item }: { item: TUser }) => <UserItemList user={item} />}
        />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    marginHorizontal: 8,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  textInputContainer: {
    flex: 1,
    marginRight: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    borderRadius: 12,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 8,
    borderRadius: 12,
  },
  selectedUserText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default UpdateTask