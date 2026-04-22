import { View, Button } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import UserInput from '@/components/UserInput'
import { router, useLocalSearchParams } from 'expo-router'
import { UserContext } from '@/providers/UserProvider'


const UpdateUser = () => {

  const {listUser, updateUser} = useContext(UserContext)
  const { id } = useLocalSearchParams()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if(id) {
      setName(listUser.find(user => user.id === Number(id))?.name || '')
      setEmail(listUser.find(user => user.id === Number(id))?.email || '')
    }
  }, [id, listUser])

  const updateUserFunction = () => {
    if(id) {
      updateUser({
        id: Number(id),
        name: name,
        email: email,
      })
      router.navigate('../')
      setName('')
      setEmail('')
      
    }
  }
  
  return (
    <View>
        <UserInput 
        name={name}
        email={email}
        setName={setName}
        setEmail={setEmail}
        />
        <Button title="Update User" onPress={updateUserFunction} />
    </View>
  )
}

export default UpdateUser