import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";

export default function StartupPage({navigation}: any) {
    const user = useQuery(api.users.signedInUser);
    const setStrolling = useMutation(api.users.setStrolling);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.topHalf} onPress={() => {
                    if (user) {
                        setStrolling({id: user._id, strolling: true})
                        navigation.navigate("StartupSearch")
                    }
                    
                }}>
                <Image
                    source={require('../assets/images/stroller.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.text}>Stroll</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.bottomHalf} onPress={() => navigation.navigate("Goodbye")}>
                <Image
                    source={require('../assets/images/scroller.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.text}>Scroll</Text>
            </TouchableOpacity>
           
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