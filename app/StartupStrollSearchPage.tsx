import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useContext, useEffect } from "react";
import { Buroughs, StrollContext } from "../contexts/StrollContext";
import { TimeIndicator } from "@/components/TimeIndicators/TimeIndicator";
import { BuroughCard } from "@/components/Burough/BuroughCard";
import { SCREEN_NAME } from "@/constants/enums";

export default function StartupStrollSearchPage({navigation}: any) {
    const {setBuroughIndex, setDuration, buroughIndex, duration} = useContext(StrollContext);

    useEffect(() => {
        if (buroughIndex !== -1) {
            navigation.navigate(SCREEN_NAME.RESULUTS)
        }
    }, [buroughIndex])

    if (duration === -1) {
        return <HowLongSelection setDuration={(mins: number) => setDuration(mins)}/>
    } else if (buroughIndex === -1) {
       return <WhereSelection minutes={duration} pickBurough={(buroughIndex: number) => setBuroughIndex(buroughIndex)}/>
    }
}


interface IHowLongSelectionProps {
    setDuration: (mins: number) => void
}
const HowLongSelection = (props: IHowLongSelectionProps) => (
    <View style={styles.container}>
        <Text style={styles.text}>How Long?</Text>
        
        <View style={styles.durationSelectContainer}>
            <TouchableOpacity onPress={() => props.setDuration(15)}>
                <TimeIndicator minutes={15} textSize={16} iconSize={32}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => props.setDuration(30)}>
                <TimeIndicator minutes={30} textSize={16} iconSize={32}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => props.setDuration(60)}>
                <TimeIndicator minutes={60} textSize={16} iconSize={32}/>
            </TouchableOpacity>
        </View>
    </View>
)

interface IWhereSelectionProps {
    minutes: number,
    pickBurough: (buroughIndex: number) => void
}
const WhereSelection = (props: IWhereSelectionProps) => (
    <View style={styles.container}>
        <View style={styles.selectedDurationContainer}>
            <TimeIndicator minutes={props.minutes} textSize={24} iconSize={96}/>
        </View>
        
        <Text style={styles.text}>Where?</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 10}}>
            <TouchableOpacity onPress={() => props.pickBurough(0)} style={styles.buroughCard}>
                <BuroughCard image={Buroughs[0].image} name={Buroughs[0].name}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => props.pickBurough(1)} style={styles.buroughCard}>
                <BuroughCard image={Buroughs[1].image} name={Buroughs[1].name}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.pickBurough(2)} style={styles.buroughCard}>
                <BuroughCard image={Buroughs[2].image} name={Buroughs[2].name}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.pickBurough(3)} style={styles.buroughCard}>
                <BuroughCard image={Buroughs[3].image} name={Buroughs[3].name}/>
            </TouchableOpacity>
        </View>
    </View>
)

const styles = StyleSheet.create({
    buroughCard: {
        width: "48%",
        marginBottom: 32
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    durationSelectContainer: {
        width: "80%",
        paddingTop: 32,
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-around'
    },
    selectedDurationContainer: {
        paddingTop: 32
    },
    text: {
      paddingTop: 32,
      fontSize: 48,
      fontWeight: 'bold',
      textAlign: "center"
    }
});