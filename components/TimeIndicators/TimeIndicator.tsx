import FontAwesome6 from "@expo/vector-icons/FontAwesome6"
import { View, StyleSheet, Text } from "react-native"

interface ITimeIndicatorProps {
    minutes: number
    textSize: number,
    iconSize: number
}
export const TimeIndicator = (props: ITimeIndicatorProps) => (
    <View >
        <FontAwesome6 name="clock" size={props.iconSize} color="black"  style={styles.durationIndicator}/>
        <Text style={{...styles.durationIndicatorText, fontSize: props.textSize}}>{props.minutes} mins</Text>
    </View>
)

const styles = StyleSheet.create({
    durationIndicator: {
        alignSelf: "center",
    },
    durationIndicatorText: {
        fontWeight: 500,
        textAlign: "center"
    }
  });