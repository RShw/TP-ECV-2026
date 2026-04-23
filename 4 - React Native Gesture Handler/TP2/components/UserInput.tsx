import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const UserInput = ({
    name,
    email,
    setName,
    setEmail,
}: {
    name: string
    email: string
    setName: (name: string) => void
    setEmail: (email: string) => void
}) => {
    
  return (
    <View style={styles.container}>
      <TextInput 
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <TextInput 
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 8,
        borderRadius: 12,
        marginBottom: 12,
        marginHorizontal: 8,
    }
})

export default UserInput