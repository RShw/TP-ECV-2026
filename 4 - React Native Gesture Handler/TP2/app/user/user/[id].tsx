import React, { useContext } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { UserContext } from '@/providers/UserProvider'
import UserItem from '@/components/UserItem'
import { View, StyleSheet } from 'react-native'

const User = () => {

    const { id } = useLocalSearchParams()
    const { listUser } = useContext(UserContext)
  return (
    <View style={styles.container}>
      <View>
      <UserItem user={listUser.find(user => user.id === Number(id)) || {id: 0, name: '', email: ''}} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default User