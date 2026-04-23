import { View, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence, interpolate } from 'react-native-reanimated'
import { router } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const ANIMATION_DURATION = 300
const DISTANCE = 100

const Index = () => {

    const animationCicle = useSharedValue(0)

    useEffect(() => {
      setTimeout(() => {
        router.navigate('/user')
      }, 10)
    }, [])
    
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
              { translateX: interpolate(
                animationCicle.value,
                [0, 1, 2, 4, 5, 6],
                [0, DISTANCE, DISTANCE, -DISTANCE, -DISTANCE, 0]
                )
              }, 
              {
               translateY: interpolate(
                animationCicle.value,
                [0, 1, 2, 4, 5, 6],
                [0, 0, DISTANCE, DISTANCE, 0, 0]
               ) 
              }],
        }
    })

    useEffect(() => {
      animationCicle.value = withRepeat(
        withSequence(
          withTiming(0, { duration: 0 }),
          withTiming(6, { duration: ANIMATION_DURATION * 7 }),
        ), 1, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.container}>
          <Animated.View style={[styles.square, animatedStyle]}/>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'lightblue',
    borderRadius: 12,
    top: -50
  },
})

export default Index