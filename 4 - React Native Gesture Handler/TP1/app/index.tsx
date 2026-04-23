import { View, StyleSheet } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

export default function Index() {

  const positionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {

    const rotate = interpolate(positionX.value, [-400, 0, 400], [-10, 0, 10], Extrapolation.CLAMP);

    return {
      transform: [
        { 
        translateX: positionX.value,
        },
        {
          scale: interpolate(positionX.value, [-400, 0, 400], [0.6, 1, 0.6], Extrapolation.CLAMP)
        },
        {
          rotate: rotate + "deg"
        }
      ]
    }
  });

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      console.log(e.translationX);
      positionX.value = e.translationX;
    })
    .onEnd(() => {
      positionX.value = withSpring(0);
    })

  return (
    <GestureHandlerRootView>
      <View
        style={styles.container}
      >
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.cardContainer, animatedStyle]} >
            <View style={styles.card} />
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cardContainer:  {
    height: 400,
    backgroundColor: "salmon",
    borderRadius: 12,
    marginHorizontal: 12,
    marginBottom: 12,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    marginHorizontal: 12,
  }
});