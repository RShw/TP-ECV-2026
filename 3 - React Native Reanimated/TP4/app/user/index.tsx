import { View, FlatList, StyleSheet, Button } from 'react-native'
import React, { useContext } from 'react'
import { UserContext } from '@/providers/UserProvider'
import UserItem from '@/components/UserItem'
import { router } from 'expo-router'

const UserList = () => {

    const {listUser} = useContext(UserContext)

    const handleAddUser = () => {
        router.navigate('/user/addUser')
    }

  return (
    <View style={styles.container}>
        <FlatList
            data={listUser}
            renderItem={({ item }) => <UserItem user={item} />}
        />
        <View style={styles.buttonContainer}>
            <Button title='Add User' onPress={handleAddUser} />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        marginVertical: 20,
    }
})

export default UserList