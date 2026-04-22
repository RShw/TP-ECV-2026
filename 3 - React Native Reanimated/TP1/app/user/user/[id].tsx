import React, { useContext } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { UserContext } from '@/providers/UserProvider'
import UserItem from '@/components/UserItem'

const User = () => {

    const { id } = useLocalSearchParams()
    const { listUser } = useContext(UserContext)
  return (
    <UserItem user={listUser.find(user => user.id === Number(id)) || {id: 0, name: '', email: ''}} />
  )
}

export default User