import { BuroughCard } from "@/components/Burough/BuroughCard";
import { TimeIndicator } from "@/components/TimeIndicators/TimeIndicator";
import { Buroughs, StrollContext } from "@/contexts/StrollContext";
import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList} from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { TimeIndicatorRange } from "@/components/TimeIndicators/TimeRangeIndicator";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SCREEN_NAME } from "./app";
import { Id } from "@/convex/_generated/dataModel";

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

interface IStroll {
    _id: Id<"strolls">;
    _creationTime: number;
    owner: Id<"users">;
    title: string;
    strollers: Id<"users">[];
    location: {
        burough: string;
        lat: number;
        lng: number;
    };
    startTime: string;
    minutes: bigint;
    maxSize: bigint;
}


export default function StrollSearchResultsPage({navigation}: any) {
    const {buroughIndex, duration} = useContext(StrollContext);
    const strolls = useQuery(api.strolls.filter, {minutes: BigInt(duration), burough: Buroughs[buroughIndex].name})

    const [strollsWithSpace, setStollsWithSpace] = useState<IStroll[]>([]);

    useEffect(() => {
        if (strolls) {
            setStollsWithSpace(strolls.filter(s => s.strollers.length < s.maxSize))
        }
    }, [strolls])

    return (
        <View style={styles.container}>
            <View style={styles.searchParamsContainer}>
                <TimeIndicator minutes={duration} textSize={24} iconSize={96} />
                <BuroughCard image={Buroughs[buroughIndex].image} name={Buroughs[buroughIndex].name} />
            </View>
            <View style={{width: "100%", height: 1, backgroundColor: "#CECECE"}}/>
            {
                strollsWithSpace.length === 0 &&
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
                strollsWithSpace.length > 0 &&
                <FlatList
                    data={strollsWithSpace}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => {navigation.navigate(SCREEN_NAME.DETAIL, {strollId: item._id})}} style={{backgroundColor: "#F8F8F8", borderWidth:1, borderRadius: 10, margin: 16,
                            borderColor:"#F2F2F2", width: 150, height: 150, padding: 8, shadowColor: "#000", shadowOpacity: 0.25, shadowOffset: {width: 0, height: 4}}}>
                            <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 20, flex: 2}}>{item.title}</Text>

                            <View style={{flexDirection: "row", marginLeft: 8, flex: 3}}>
                                {
                                    Array.from({ length: Math.min(item.strollers.length, 4) }, (_, i) => i).map((index) => (
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
                                    <Text style={{fontSize: 8, fontWeight: "bold", marginTop:4, marginLeft: 4}}>{item.strollers.length}/{Number(item.maxSize)}</Text>
                                </View>
                                
                                <TimeIndicatorRange startTime={item.startTime} minutes={Number(item.minutes)}/>   
                            </View>    
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item._id}
                    numColumns={2} // Set number of columns to 2
                    style={{ height: "50%"}}
                />
            }
            <TouchableOpacity style={styles.strollingButton} onPress={() => navigation.navigate(SCREEN_NAME.CREATE)}>
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