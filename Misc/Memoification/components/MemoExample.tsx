import React, { useEffect, useMemo, useState } from "react";
import { Button, Text, View } from "react-native";

function MemoExample() {

    const [count1, setcount1] = useState(0)
    const [count2, setcount2] = useState(0)

    const value1 = useMemo(() => {
      console.log('MEMO 1')
      return 100 + count1
    }, [count1])

    const value2 = useMemo(() => {
      console.log('MEMO 2')
      return 100 + count2
    }, [count2])

    const handleIncrement = React.useCallback(() => {
      setcount1(c => c + 1);
    }, []);

    const handleIncrement2 = React.useCallback(() => {
      setcount2(c => c + 1);
    }, []);

    useEffect(() => {
        handleIncrement2()
    }, [handleIncrement2])
    

    return (
      <View
        style={{
          flex: 1,
          // justifyContent: "center",
          alignItems: "center",
        }}
      >

          <Text>Count: {value1}</Text>
          <Text>Count2: {value2}</Text>
          <Button title="Increment" onPress={handleIncrement} />
          <Button title="Increment2" onPress={handleIncrement2} />
        
      </View>
  );
}

export default React.memo(MemoExample);