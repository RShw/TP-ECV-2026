import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TCard } from '../index'
import { isNumber } from '@/helpers'
import Animated, { LinearTransition, SlideInDown, SlideInUp } from 'react-native-reanimated'

const Card = ({
    card,
    cardList,
    setCardList,
}: {
    card: TCard,
    cardList: TCard[],
    setCardList: (cardList: TCard[]) => void
}) => {

    const [localHeight, setLocalHeight] = useState(card.height)

    useEffect(() => {
        if(isNumber(localHeight)) {
            setCardList(cardList.map(c => c.id === card.id ? { ...c, height: localHeight } : c))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localHeight, setCardList])

    const handlePress = () => {
        const tempListCard = cardList.filter(c => c.id !== card.id)
        setCardList([card, ...tempListCard])
    }
    
  return (
    <Animated.View
        entering={SlideInDown.duration(1000)}
        exiting={SlideInUp.duration(1000)}
        layout={LinearTransition}
    >
        <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
            <View 
                style={[styles.card, { height: card.height, backgroundColor: card.color }]} 
            >
                <TextInput 
                    style={styles.input}
                    value={localHeight.toString()}
                    onChangeText={(text) => setLocalHeight(Number(text))}
                />
            </View>
        </TouchableOpacity>
    </Animated.View>
  )
}

export default Card

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "lightgray",
    },
    cardContainer: {
      width: "100%",
      borderRadius: 12,
      padding: 8,
    },
    card: {
      width: "100%",
      borderRadius: 12,
      padding: 4,
      paddingHorizontal: 12,
      justifyContent: "center",
    },
    input: {
      borderWidth: 1,
      borderColor: "black",
      padding: 4,
      borderRadius: 12,
    },
  })
  