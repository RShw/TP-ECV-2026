import React from 'react'
import UserListProvider from '@/provider/UserListProvider'
import { Stack } from 'expo-router'


const _layout = () => {
  return (
    <UserListProvider>
        <Stack />
    </UserListProvider>
  )
}

export default _layout