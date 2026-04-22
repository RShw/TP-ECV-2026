import { View, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { router } from 'expo-router'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence } from 'react-native-reanimated'

const ANIMATION_DURATION = 1000
const DISTANCE = 100
const LONG_DISTANCE = DISTANCE * 2

const Index = () => {

    const posX = useSharedValue(0)
    const posY = useSharedValue(0)

    const animationCicle = useSharedValue(0)
  
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: posX.value }, { translateY: posY.value }],
        }
    })

    useEffect(() => {
      animationCicle.value = withRepeat(
        withSequence(
          withTiming(1, { duration: ANIMATION_DURATION }),
          withTiming(0, { duration: ANIMATION_DURATION }),
        ), -1, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.square, animatedStyle]}/>
    </View>
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