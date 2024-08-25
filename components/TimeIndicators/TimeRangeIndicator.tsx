import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { View, Text } from "react-native";

export const formatTime = (date: Date): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();
    return `${hours}:${minutesStr}${ampm}`;
};

const getTimeRange = (isoString: string, minuteDuration: number): string  => {
    const isoStartDate = new Date(isoString);
    const startDate = new Date(isoStartDate.setHours(isoStartDate.getHours() + 4)); // for conversion to EDT
    const endDate = new Date(startDate.getTime() + minuteDuration * 60000);

    // Create the time range string
    const startTimeStr = formatTime(startDate);
    const endTimeStr = formatTime(endDate);

    return `${startTimeStr}-${endTimeStr}`;
}

interface ITimeIndicatorRangeProps {
    startTime: string,
    minutes: number
}
export const TimeIndicatorRange = (props: ITimeIndicatorRangeProps) => (
    <View style={{flexDirection: "row"}}>
        <FontAwesome6 name="clock" size={16} color="black" />
        <Text style={{fontSize: 8, fontWeight: "bold", marginTop:4, marginLeft: 4}}>{getTimeRange(props.startTime, props.minutes)}</Text>
    </View>  
)

export const TimeIndicatorRangeLarge = (props: ITimeIndicatorRangeProps) => (
    <View style={{flexDirection: "row"}}>
        <FontAwesome6 name="clock" size={32} color="black" />
        <Text style={{fontSize: 16, fontWeight: "bold", marginTop:4, marginLeft: 4}}>{getTimeRange(props.startTime, props.minutes)}</Text>
    </View>  
)