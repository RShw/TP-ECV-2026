import { View, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import UserInput from '@/components/UserInput'
import { UserContext } from '@/providers/StateProvider'
import { router } from 'expo-router'

const AddUser = () => {

    const { addUser, listUser } = useContext(UserContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const addUserFunction = () => {
        addUser({
            id: listUser.length + 1,
            name: name,
            email: email,
        })
        router.navigate('../')
        setName('')
        setEmail('')    
    }
  return (
    <View>
      <UserInput
        name={name}
        email={email}
        setName={setName}
        setEmail={setEmail}
      />
      <Button title="Add User" onPress={addUserFunction} />
    </View>
  )
}

export default AddUser