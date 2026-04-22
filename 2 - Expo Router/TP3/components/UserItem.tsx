import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { TUser } from '@/providers/UserProvider'

const UserItem = ({ user }: { user: TUser }) => {

    const handlePress = () => {
        router.navigate(`/user/user/${user.id}`)
    }

    const handleUpdate = () => {
        router.navigate(`/user/updateUser/${user.id}`)
    }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
        <View style={styles.userItemContainer}>
            <View style={styles.userInfoContainer}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
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
        width: '100%',
        justifyContent: 'center',
        padding: 12,
        paddingVertical: 4
    },
    userItemContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'lightgrey',
        padding: 12,
        borderRadius: 12,
    },
    userInfoContainer: {
        flex: 1,
        // justifyContent: 'space-between',
        // alignItems: 'center',

    },
    userActionContainer: {
        backgroundColor: "white",
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 14,
        color: 'grey',
    }
})

export default UserItem