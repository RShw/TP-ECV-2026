import { View, Button } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import UserInput from '@/components/UserInput'
import { UserListContext } from '@/provider/UserListProvider'

const Settings = () => {

    const ProviderValue = useContext(UserListContext)

    const params = useLocalSearchParams()

    useEffect(() => {
      if(params?.user[0]) {
        setIdUSer(Number(params?.user[0]))
      }
      if(params?.user[1]) {
        const name = params?.user[1] as string
        setName(name)
      }
      if(params?.user[2]) {
        const email = params?.user[2] as string
        setEmail(email)
      }
    }, [params])
    
    const [nameState, setName] = useState('')
    const [emailState, setEmail] = useState('')
    const [idUSer, setIdUSer] = useState<number | undefined>(undefined)

    const updateUser = () => {
        if(idUSer) {
            ProviderValue.updateUser({
                id: Number(idUSer),
                name: nameState,
                email: emailState,
            })
            router.navigate('../')
        }
        else {
            console.warn('No user selected')
        }
    }

  return (
    <View>
      <UserInput 
        name={nameState}
        email={emailState}
        setName={setName}
        setEmail={setEmail}
      />
      <Button title="Update User" onPress={updateUser} />
    </View>
  )
}

export default Settings