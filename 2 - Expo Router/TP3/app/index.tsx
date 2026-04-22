import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { router } from 'expo-router'

const Index = () => {

    useLayoutEffect(() => {
        setTimeout(() => {
            router.navigate('/task')
        }, 1)
    }, [])

  return (
    <View>
      <Text>Index</Text>
    </View>
  )
}

export default Index