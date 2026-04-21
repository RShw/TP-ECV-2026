import { View, Button } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { router } from 'expo-router'
import UserInput from '@/components/UserInput'
import { UserListContext } from '@/provider/UserListProvider'

const Settings = () => {

    const ProviderValue = useContext(UserListContext)
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const updateUser = () => {
        if(ProviderValue.activeUser) {
            ProviderValue.updateUser({
                id: ProviderValue.activeUser,
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
        if(ProviderValue.activeUser) {
            setName(ProviderValue.userList.find(user => user.id === ProviderValue.activeUser)?.name || '')
            setEmail(ProviderValue.userList.find(user => user.id === ProviderValue.activeUser)?.email || '')
        }
    }, [ProviderValue.activeUser, ProviderValue.userList])

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