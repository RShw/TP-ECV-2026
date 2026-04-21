import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import UserItem from '../components/UserItem'
import { UserListContext } from '@/provider/UserListProvider'

const User = () => {

    const ProviderValue = useContext(UserListContext)

    const user = ProviderValue.userList.find(user => user.id === ProviderValue.activeUser)

  return (
    <View>
        {user ? <UserItem user={user} /> : <Text>NO USER</Text>}
    </View>
  )
}

export default User