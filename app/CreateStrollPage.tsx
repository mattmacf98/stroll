import { BuroughCard } from "@/components/Burough/BuroughCard";
import { TimeIndicator } from "@/components/TimeIndicators/TimeIndicator";
import { Buroughs, StrollContext } from "@/contexts/StrollContext";
import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import TimePicker from 'react-native-wheel-time-picker';
import Slider from '@react-native-community/slider';
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";


const MILLISECONDS_PER_HOUR = 60 * 60 * 1000;
const MILLISECONDS_PER_DAY = 24 * MILLISECONDS_PER_HOUR;

const getIsoStringForSelectedTime = (ms: number) => {
    const time = Date.now();
    return new Date(time - (time % MILLISECONDS_PER_DAY) + ms).toISOString();
}

export default function CreateStrollPage({navigation}: any) {
    const {buroughIndex, duration } = useContext(StrollContext);
    const [timeValue, setTimeValue] = useState(Date.now() % MILLISECONDS_PER_DAY);
    const [maxStrollers, setMaxStrollers] = useState(1);
    const createStroll = useMutation(api.strolls.create);

    const handleButtonPress = async () => {
        const strollId =  await createStroll(
            {
              owner: "jh715tq7g52ye3602pab9xkr196zana3" as Id<"users">,
              title: "Matt's Walk", burough: Buroughs[buroughIndex].name, 
              lat: 0, lng: 0, startTime: getIsoStringForSelectedTime(timeValue), minutes: BigInt(duration),
              maxSize: BigInt(maxStrollers) 
            }
          );
        console.log(strollId);
        navigation.navigate("StrollDetail", {strollId: strollId});
    }

    return (
        <View style={styles.container}>

            <View style={styles.searchParamsContainer}>
                <TimeIndicator minutes={duration} textSize={24} iconSize={96} />
                <BuroughCard image={Buroughs[buroughIndex].image} name={Buroughs[buroughIndex].name} />
            </View>

            <View style={{width: "100%", height: 1, backgroundColor: "#CECECE"}}/>

            <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <View >
                    <View style={{marginTop: 32}}>
                        <Text style={{textAlign: "center", fontSize: 32, fontWeight: "bold"}}>When?</Text>
                    </View>

                    <View style={{marginTop: 64}}>
                        <TimePicker
                            timeFormat={['hours12', ':', 'min', 'am/pm']}
                            value={timeValue}
                            wheelProps={{
                                containerStyle: {width: 80, height: 300},
                                textStyle: {fontSize: 24},
                                wheelHeight: 100,
                                itemHeight: 50,
                            }}
                            onChange={(newValue) => setTimeValue(newValue)}
                        />
                    </View>
                </View>
                

                <View style={{flex: 1}}>
                    <View style={{marginTop: 64}}>
                        <Text style={{textAlign: "center", fontSize: 32, fontWeight: "bold"}}>How Large?</Text>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Slider
                            style={{width: 300, height: 40}}
                            minimumValue={1}
                            maximumValue={10}
                            value={maxStrollers}
                            onValueChange={(val) => setMaxStrollers(val)}
                            step={1}
                            minimumTrackTintColor="#34a1eb"
                            maximumTrackTintColor="#F0F20F0"
                        />
                        <Text style={{textAlign: "center", marginTop: 8, fontWeight: "bold", fontSize: 18}}>{maxStrollers === 1 ? "Just Me!" : `${maxStrollers} Strollers`}</Text>
                    </View>
                </View>
                

                <View style={{flex:1}}>
                    <TouchableOpacity style={styles.strollingButton} onPress={handleButtonPress}>
                        <Text style={styles.strollingButtonText}>Create</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: "column",
        height: "100%"
    },
    searchParamsContainer: {
        width: "100%",
        paddingTop: 16,
        paddingBottom: 32,
        flexDirection: "row",
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: "#BABABA"
    },
    strollingButton: {
        marginBottom: 64,
        backgroundColor: '#65558F',
        width: 128,
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
      },
    strollingButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});