import { BuroughCard } from "@/components/Burough/BuroughCard";
import { TimeIndicator } from "@/components/TimeIndicators/TimeIndicator";
import { Buroughs, StrollContext } from "@/contexts/StrollContext";
import { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { TimeIndicatorRange } from "@/components/TimeIndicators/TimeRangeIndicator";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const profileImages = [
    require('../assets/images/profile_pics/0.png'),
    require('../assets/images/profile_pics/1.png'),
    require('../assets/images/profile_pics/2.png'),
    require('../assets/images/profile_pics/3.png'),
    require('../assets/images/profile_pics/4.png'),
    require('../assets/images/profile_pics/5.png'),
    require('../assets/images/profile_pics/6.png'),
    require('../assets/images/profile_pics/7.png'),
    require('../assets/images/profile_pics/8.png'),
  ];

export default function StrollSearchResultsPage({navigation}: any) {
    const {buroughIndex, duration} = useContext(StrollContext);
    const strolls = useQuery(api.strolls.filter, {minutes: BigInt(duration), burough: Buroughs[buroughIndex].name})

    return (
        <View style={styles.container}>
            <View style={styles.searchParamsContainer}>
                <TimeIndicator minutes={duration} textSize={24} iconSize={96} />
                <BuroughCard image={Buroughs[buroughIndex].image} name={Buroughs[buroughIndex].name} />
            </View>
            <View style={{width: "100%", height: 1, backgroundColor: "#CECECE"}}/>
            {
                strolls === undefined || strolls.length === 0 &&
                <View style={{flex: 4, paddingTop: 64, alignItems: "center"}}>
                    <Image
                        source={require('../assets/images/no_walks.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={{textAlign: "center", fontSize: 32, fontWeight: "bold"}}>No Matching</Text>
                    <Text style={{textAlign: "center", fontSize: 32, fontWeight: "bold"}}>Walks</Text>

                </View>
            }
            {
                strolls && strolls.length > 0 &&
                <View style={{flex: 4, alignItems: "center", flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 32}}>
                    {strolls.map((stroll, index) => (
                        <TouchableOpacity key={index} onPress={() => {navigation.navigate("StrollDetail", {strollId: stroll._id})}} style={{backgroundColor: "#F8F8F8", borderWidth:1, borderRadius: 10, marginTop: 32,
                        borderColor:"#F2F2F2", width: 160, height: 160, padding: 8, shadowColor: "#000", shadowOpacity: 0.25, shadowOffset: {width: 0, height: 4}}}>
                            <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 20, flex: 2}}>{stroll.title}</Text>

                            <View style={{flexDirection: "row", marginLeft: 16, flex: 3}}>
                                {
                                    Array.from({ length: stroll.strollers.length }, (_, i) => i).map((index) => (
                                        <Image
                                            key={index}
                                            source={profileImages[Math.floor(Math.random() * profileImages.length)]}
                                            style={{width: 45, height: 45, position: "absolute", left: index*25}}
                                            resizeMode="contain"
                                        />
                                    ))
                                }
                            </View>
                            
                            
                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                <View style={{flexDirection: "row", justifyContent: "center"}}>
                                    <FontAwesome6 name="person" size={16} color="black"/>
                                    <Text style={{fontSize: 8, fontWeight: "bold", marginTop:4, marginLeft: 4}}>{stroll.strollers.length}/{Number(stroll.maxSize)}</Text>
                                </View>
                                
                                <TimeIndicatorRange startTime={stroll.startTime} minutes={Number(stroll.minutes)}/>   
                            </View>    
                        </TouchableOpacity>
                    ))}
                </View>
            }
            <TouchableOpacity style={styles.strollingButton} onPress={() => navigation.navigate("CreateStroll")}>
                <Text style={styles.strollingButtonText}>Start Your Own</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    searchParamsContainer: {
        width: "100%",
        paddingTop: 16,
        paddingBottom: 32,
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-around'
    },
    image: {
        height: "60%"
    },
    strollingButton: {
        marginBottom: 64,
        backgroundColor: '#65558F',
        width: 200,
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