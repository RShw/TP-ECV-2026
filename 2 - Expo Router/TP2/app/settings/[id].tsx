import { View, Button } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import UserInput from '@/components/UserInput'
import { UserListContext } from '@/provider/UserListProvider'

const Settings = () => {

    const ProviderValue = useContext(UserListContext)

    const { id } = useLocalSearchParams()
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const updateUser = () => {
        if(id) {
            ProviderValue.updateUser({
                id: Number(id),
                name: name,
                email: email,
            })
            router.navigate('../')
        }
        else {
            console.warn('No user selected')
        }
    }

    useEffect(() => {
        if(id) {
            setName(ProviderValue.userList.find(user => user.id === Number(id))?.name || '')
            setEmail(ProviderValue.userList.find(user => user.id === Number(id))?.email || '')
        }
    }, [id, ProviderValue.userList])

  return (
    <View>
      <UserInput 
        name={name}
        email={email}
        setName={setName}
        setEmail={setEmail}
      />
      <Button title="Update User" onPress={updateUser} />
    </View>
  )
}

export default Settings