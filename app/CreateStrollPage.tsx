import { BuroughCard } from "@/components/Burough/BuroughCard";
import { TimeIndicator } from "@/components/TimeIndicators/TimeIndicator";
import { Buroughs, StrollContext } from "@/contexts/StrollContext";
import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Switch } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SCREEN_NAME } from "@/constants/enums";

export default function CreateStrollPage({navigation}: any) {
    const {buroughIndex, duration, userId } = useContext(StrollContext);
    const [date, setDate] = useState(new Date());
    const [maxStrollers, setMaxStrollers] = useState(1);
    const [friendsOnly, setFriendsOnly] = useState(false);
    const createStroll = useMutation(api.strolls.create);
    const user = useQuery(api.users.signedInUser)

    const handleButtonPress = async () => {
        if (user) {
            const strollId =  await createStroll(
                {
                  owner: user._id,
                  title: `${user.name}'s Stroll`, burough: Buroughs[buroughIndex].name, 
                  lat: 0, lng: 0, startTime: date.toISOString(), minutes: BigInt(duration),
                  maxSize: BigInt(maxStrollers), friendsOnly: friendsOnly 
                }
              );
            navigation.navigate(SCREEN_NAME.DETAIL, {strollId: strollId});
        }
    }

    //TODO: Friends Only Toggle
    return (
        <View style={styles.container}>

            <View style={styles.searchParamsContainer}>
                <TimeIndicator minutes={duration} textSize={24} iconSize={96} />
                <BuroughCard image={Buroughs[buroughIndex].image} name={Buroughs[buroughIndex].name} />
            </View>

            <View style={{width: "100%", height: 1, backgroundColor: "#CECECE"}}/>

            <View style={{flexDirection: "row", width: "100%", marginTop: 16, marginLeft: 64}}>
                <View>
                    <Switch
                        style={{alignSelf: "flex-start", marginLeft: 8}}
                        trackColor={{false: '#767577', true: '#34C759'}}
                        thumbColor="#ffffff"
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setFriendsOnly(!friendsOnly)}
                        value={friendsOnly}
                    />
                    <Text style={{textAlign: "center", marginTop: 4, fontSize: 12, fontWeight: "bold"}}>{friendsOnly ? "Friends Only" : "Public"}</Text>
                </View>
            </View>

            <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <View >
                    <View style={{marginTop: 16}}>
                        <Text style={{textAlign: "center", fontSize: 32, fontWeight: "bold"}}>When?</Text>
                    </View>

                    <View style={{marginTop: 64}}>
                        <DateTimePicker
                            minuteInterval={15}
                            minimumDate={new Date()}
                            value={date}
                            mode={"time"}
                            is24Hour={true}
                            onChange={(event, selectedDate) => {
                                if (selectedDate) {
                                    setDate(selectedDate)
                                }
                            }}
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