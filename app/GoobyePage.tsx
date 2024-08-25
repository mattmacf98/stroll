import { View, Image, Text, Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get('window');

export default function GoodbyePage() {
    return (
        <View style={styles.container}>
          <View style={styles.topHalf}>
              <Image
                  source={require("../assets/images/wave.png")}
                  style={styles.image}
                  resizeMode="contain"
                />
                <Text style={styles.text}>Goodbye!</Text>
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    topHalf: {
      paddingTop: 240,
      height: height / 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '80%',
      height: '80%',
    },
    text: {
      paddingTop: 32,
      fontSize: 32,
      fontWeight: 'bold'
    }
  });