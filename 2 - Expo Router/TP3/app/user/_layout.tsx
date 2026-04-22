import React from 'react'
import { Stack } from 'expo-router'
import UserProvider from '@/providers/UserProvider'

const UserLayout = () => {
  return (
    <UserProvider>
     <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='addUser' options={{ title: 'Add User' }} />
        <Stack.Screen name='user/[id]' options={{ title: 'User' }} />
        <Stack.Screen name='updateUser/[id]' options={{ title: 'Update User' }} />
     </Stack>
    </UserProvider>
  )
}

export default UserLayout