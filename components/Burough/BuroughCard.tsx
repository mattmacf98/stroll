import { IBurough } from "@/contexts/StrollContext";
import { View, Image, Text, StyleSheet } from "react-native"


export const BuroughCard = (props: IBurough) => (
    <View>
        <Image
            source={props.image}
            style={styles.buroughImage}
        />
        <Text style={styles.buroughCardText}>{props.name}</Text>
    </View>
)

const styles = StyleSheet.create({
    buroughImage: {
        width: 128, 
        height: 128,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        alignSelf: "center"
    },
    buroughCardText: {
        textAlign: "center",
        fontWeight: "semibold",
        fontSize: 18
    }
  });