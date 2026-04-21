import { View, Button } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Link, router } from 'expo-router'
import { UserListContext } from '@/provider/UserListProvider'
import UserInput from '@/components/UserInput'

const AddUser = () => {


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const ProviderValue = useContext(UserListContext)

    useEffect(() => {
        console.log(name, email)
    }, [name, email])

    const addUser = () => {
        ProviderValue.addUser({
            id: ProviderValue.userList.length + 1,
            name: name,
            email: email,
        })
        setName('')
        setEmail('')
        router.navigate('../')
    }
  return (
    <View>
      <Link href={'./../'}>Go Back</Link>
      <UserInput 
        name={name}
        email={email}
        setName={setName}
        setEmail={setEmail}
      />
      <Button title="Add User" onPress={addUser} />
    </View>
  );
};

export default AddUser;