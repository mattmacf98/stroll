import { Text, StyleSheet, View, Image } from "react-native";

export default function StartupPage() {
    return (
        <View style={styles.container}>
            <View style={styles.topHalf}>
                <Image
                    source={require('../assets/images/stroller.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.text}>Stroll</Text>
            </View>
            <View style={styles.bottomHalf}>
                <Image
                    source={require('../assets/images/scroller.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.text}>Scroll</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topHalf: {
      flex: 1,  
      backgroundColor: '#D1FFC8',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomHalf: {
      flex: 1,  
      backgroundColor: '#FDBBBB',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
        height: 250
    },
    text: {
        paddingTop: 32,
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
      },
});