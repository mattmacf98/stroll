import { BuroughCard } from "@/components/Burough/BuroughCard";
import { TimeIndicator } from "@/components/TimeIndicator/TimeIndicator";
import { Buroughs, StrollContext } from "@/contexts/StrollContext";
import { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

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

  const formatTime = (date: Date): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    
    const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();
    return `${hours}:${minutesStr}${ampm}`;
  };

const  getTimeRange = (isoString: string, minuteDuration: number): string  => {
    const startDate = new Date(isoString);
    const endDate = new Date(startDate.getTime() + minuteDuration * 60000);

    // Create the time range string
    const startTimeStr = formatTime(startDate);
    const endTimeStr = formatTime(endDate);

    return `${startTimeStr}-${endTimeStr}`;
}

export default function StrollSearchResultsPage() {
    const {buroughIndex, duration, strolls} = useContext(StrollContext);

    return (
        <View style={styles.container}>
            <View style={styles.searchParamsContainer}>
                <TimeIndicator minutes={duration} textSize={24} iconSize={96} />
                <BuroughCard image={Buroughs[buroughIndex].image} name={Buroughs[buroughIndex].name} />
            </View>
            {
                strolls.length === 0 &&
                <View style={{flex: 4, paddingTop: 64, alignItems: "center"}}>
                    <Image
                        source={require('../assets/images/no_walks.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={{textAlign: "center", fontSize: 32, fontWeight: "bold"}}>No Matching</Text>
                    <Text style={{textAlign: "center", fontSize: 32, fontWeight: "bold"}}>Walks</Text>

                    <TouchableOpacity style={styles.strollingButton}>
                        <Text style={styles.strollingButtonText}>Start Your Own</Text>
                    </TouchableOpacity>

                </View>
            }
            {
                strolls.length > 0 &&
                <View style={{flex: 4, alignItems: "center", flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 32}}>
                    {strolls.map((stroll, index) => (
                        <View key={index} style={{backgroundColor: "#F8F8F8", borderWidth:1, borderRadius: 10, marginTop: 32,
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
                                    <Text style={{fontSize: 8, fontWeight: "bold", marginTop:4, marginLeft: 4}}>{stroll.strollers.length}/{stroll.maxSize}</Text>
                                </View>
                                
                                <View style={{flexDirection: "row"}}>
                                    <FontAwesome6 name="clock" size={16} color="black" />
                                    <Text style={{fontSize: 8, fontWeight: "bold", marginTop:4, marginLeft: 4}}>{getTimeRange(stroll.startTime, stroll.minutes)}</Text>
                                </View>      
                            </View>    
                        </View>
                    ))}
                </View>
            }
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
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: "#BABABA"
    },
    image: {
        height: "60%"
    },
    strollingButton: {
        marginTop: 64,
        backgroundColor: '#65558F',
        width: 250,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
    strollingButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});