import { View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View
      style={[styles.container, styles.wrapperHorizontal]}
    >
      <View style={styles.wrapperVertical}>
        <View style={styles.wrapperVertical}>
          <View style={styles.blue}/>
          <View style={styles.purple}/>
        </View>
        <View style={styles.wrapperHorizontal}>
          <View style={styles.wrapperHorizontal}> 
            <View style={styles.red}/>
            <View style={styles.green}/>
          </View>
          <View style={styles.blue}/>
        </View>
      </View>
      <View style={styles.wrapperVertical}>
        <View style={styles.wrapperHorizontal}>
          <View style={styles.wrapperVertical}>
          <View style={styles.red}/>
          <View style={styles.yellow}>
            <View style={styles.red}/>
            <View style={styles.yellow}/>  
            <View style={styles.red}/>
          </View>
          <View style={styles.red}/>
          </View>
          <View style={styles.red}/>
        </View>
        <View style={styles.wrapperHorizontal}>
          <View style={styles.red}/>
          <View style={styles.blue}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "salmon",
  },
  wrapperVertical: {
    flex: 1,
    flexDirection: "row",
  },
  wrapperHorizontal: {
    flex: 1,
  },
  yellow: {
    backgroundColor: "yellow",
    flex: 1,
  },
  red: {
    backgroundColor: "red",
    flex: 1,
  },
  blue: {
    backgroundColor: "blue",
    flex: 1,
  },
  green: {
    backgroundColor: "green",
    flex: 2,
  },
  purple: {
    backgroundColor: "purple",
    flex: 1,
  }
})
