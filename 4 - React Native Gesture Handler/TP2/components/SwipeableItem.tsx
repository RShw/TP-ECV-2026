import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
    LinearTransition,
    SlideOutLeft,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated'

type TItem = {
    id: string;
}

const SwipeableItem = ({
    children,
    item,
    deleteItem,
    handleLongPress,
}: {
    children: React.ReactNode, 
    item: TItem, 
    deleteItem: () => void, 
    handleLongPress: () => void
}) => {

    const translateX = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }]
        }
    })

    const gesturePan = Gesture.Pan()
        .onUpdate((event) => {
            if(event.translationX > -80 && event.translationX < 4) {
                translateX.value = event.translationX
            }
            if (event.translationX < -80) {
                deleteItem()
            }
        })
        .onFinalize(() => {
            translateX.value = withSpring(0)
        })

    const gestureLongPress = Gesture.LongPress()
        .onStart(() => {
            handleLongPress()
        })
        .requireExternalGestureToFail(gesturePan)

    const gestureHandler = Gesture.Simultaneous(gesturePan, gestureLongPress)

  return (
    <GestureDetector gesture={gestureHandler}> 
        <Animated.View 
            layout={LinearTransition.duration(300)}
            exiting={SlideOutLeft.duration(300)}
            style={styles.container}
        >
            <View style={styles.deleteContainer} pointerEvents="none">
                <Text>Delete</Text>
            </View>
            <Animated.View
                style={[styles.containerItem, animatedStyle]}
            >
                {children}
            </Animated.View>
        </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginVertical: 4,
        height: 60,
    },
    containerItem: {
        width: '100%',
        height: 60,
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 1,
    },
    deleteContainer: {
        backgroundColor: 'red',
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        height: 60,
        width: 80,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        zIndex: -1,
    }
})

export default SwipeableItem