import { View, FlatList, StyleSheet, Button } from 'react-native'
import React, { useContext } from 'react'
import { TUser, UserContext } from '@/providers/UserProvider'
import UserItem from '@/components/UserItem'
import { router } from 'expo-router'
import SwipeableItem from '@/components/SwipeableItem'

const UserList = () => {

    const {listUser, deleteUser} = useContext(UserContext)

    const handleAddUser = () => {
        router.navigate('/user/addUser')
    }

    const handleLongPress = (id: number) => {
        router.navigate(`/user/user/${id}`)
        console.log('long press', id)
    }

    const renderItemSwipeable = ({ item }: { item: TUser }) => {
        return (
            <SwipeableItem 
                item={{ id: item.id.toString() }} 
                deleteItem={() => deleteUser(item.id)}
                handleLongPress={() => handleLongPress(item.id)}
            >
                <UserItem user={item} />
            </SwipeableItem>
        )
    }

  return (
    <View style={styles.container}>
        <FlatList
            data={listUser}
            renderItem={renderItemSwipeable}
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