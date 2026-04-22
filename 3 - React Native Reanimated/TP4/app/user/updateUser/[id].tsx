import { Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserInput from '@/components/UserInput'
import { router, useLocalSearchParams } from 'expo-router'
import { useUserContext } from '@/providers/UserProvider'


const UpdateUser = () => {

  // const {listUser, updateUser} = useContext(UserContext)
  const { listUser, updateUser } = useUserContext()
  
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
    <>
        <UserInput 
        name={name}
        email={email}
        setName={setName}
        setEmail={setEmail}
        />
        <Button title="Update User" onPress={updateUserFunction} />
    </>
  )
}

export default UpdateUser