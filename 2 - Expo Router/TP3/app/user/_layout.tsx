import React from 'react'
import { Stack } from 'expo-router'

const UserLayout = () => {
  return (
     <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='addUser' options={{ title: 'Add User' }} />
        <Stack.Screen name='user/[id]' options={{ title: 'User' }} />
        <Stack.Screen name='updateUser/[id]' options={{ title: 'Update User' }} />
     </Stack>
  )
}

export default UserLayout