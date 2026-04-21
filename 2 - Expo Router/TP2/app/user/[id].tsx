import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import UserItem from '@/components/UserItem'
import { UserListContext } from '@/provider/UserListProvider'
import { useLocalSearchParams } from 'expo-router'

const User = () => {

    const ProviderValue = useContext(UserListContext)

    const { id } = useLocalSearchParams()

    const user = ProviderValue.userList.find(user => user.id === Number(id))

  return (
    <View>
        {user ? <UserItem user={user} /> : <Text>NO USER</Text>}
    </View>
  )
}

export default User