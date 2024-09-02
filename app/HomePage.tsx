import { TimeIndicatorRange } from "@/components/TimeIndicators/TimeRangeIndicator";
import { SCREEN_NAME } from "@/constants/enums";
import { StrollContext } from "@/contexts/StrollContext";
import { api } from "@/convex/_generated/api";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useQuery } from "convex/react";
import { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Linking, ScrollView } from "react-native";

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

interface IUserCardProps {
    navigation: any,
    strollId: string,
    strollTitle: string,
    numStrollers: number
    maxSize: number,
    strollStartTime: string,
    strollMinutes: number
}
const UserCard = (props: IUserCardProps) => {
    return (
        <TouchableOpacity onPress={() => {props.navigation.navigate(SCREEN_NAME.DETAIL, {strollId: props.strollId})}} style={{backgroundColor: "#F8F8F8", borderWidth:1, borderRadius: 10, margin: 16,
            borderColor:"#F2F2F2", width: 150, height: 150, padding: 8, shadowColor: "#000", shadowOpacity: 0.25, shadowOffset: {width: 0, height: 4}}}>
                <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 20, flex: 2}}>{props.strollTitle}</Text>

                <View style={{flexDirection: "row", marginLeft: 8, flex: 3}}>
                    {
                        Array.from({ length: Math.min(props.numStrollers, 4) }, (_, i) => i).map((index) => (
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
                        <Text style={{fontSize: 8, fontWeight: "bold", marginTop:4, marginLeft: 4}}>{props.numStrollers}/{props.maxSize}</Text>
                    </View>
                    
                    <TimeIndicatorRange startTime={props.strollStartTime} minutes={props.strollMinutes}/>   
                </View>    
            </TouchableOpacity>
    )
}

const getEmojiFromStreak = (streak: number): string => {
    if (streak === 0) {
        return "😑"
    } else if (streak < 5) {
        return "🙂"
    } else if (streak < 10) {
        return "😏"
    } else if (streak < 20) {
        return "🤠"
    } else {
        return "🥵"
    }
}

export default function HomePage({navigation}: any) {
    const {setBuroughIndex, setDuration} = useContext(StrollContext);
    const userStrolls = useQuery(api.strolls.getSignedInUserStrolls);
    const user = useQuery(api.users.signedInUser);
    const streak = (user && user.streak) ? Number(user.streak) : 0;
    const articles = useQuery(api.articles.getAll);
    
    return (
        <ScrollView style={styles.container} contentContainerStyle={{alignItems: "center"}}>
            <View style={{alignSelf: "flex-end", marginRight: 16, marginTop: 16, flexDirection: "row"}}>
                <Text style={{fontSize: 48}}>{getEmojiFromStreak(streak)}</Text>
                <Text style={{fontSize: 32, fontWeight: "bold", marginLeft: 12, marginTop: 8}}>{streak}</Text>
                <Text style={{fontSize: 12, fontWeight: "bold", marginLeft: 4, marginTop: 18}}>Days</Text>
            </View>
            
            <Text style={styles.text}>Today's Strolls</Text>
            <FlatList
                style={{maxHeight: 200, minHeight: 50}}
                horizontal={true}
                data={userStrolls}
                keyExtractor={(stroll) => stroll._id}
                renderItem={({ item }) => {
                    return (
                        <UserCard navigation={navigation} strollId={item._id} strollTitle={item.title} numStrollers={item.strollers.length} 
                        maxSize={Number(item.maxSize)} strollStartTime={item.startTime} strollMinutes={Number(item.minutes)} />
                    )
                }}
            />

            <View>
                <TouchableOpacity style={styles.strollingButton} onPress={() => {
                    setBuroughIndex(-1);
                    setDuration(-1);
                    navigation.navigate(SCREEN_NAME.SEARCH);
                }}>
                    <Text style={styles.strollingButtonText}>Find More Strolls</Text>
                </TouchableOpacity>
            </View>

            <View style={{borderTopWidth: 2, width: "100%", borderColor: "#EDEAEA"}}>
                <Text style={{textAlign: "center", marginTop: 16, fontWeight: "bold", fontSize: 32}}>News</Text>
                <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                    {
                        articles?.map((article) => (
                            <TouchableOpacity key={article._id} onPress={async () => await Linking.openURL(article.url)} style={{width: `${Number(article.colSpan) * 25}%`, marginTop: 32}}>
                                <Image
                                    style={{width: "90%", height: 200, alignSelf: "center", borderRadius: 10}}
                                    source={{uri: article.imageUrl}}
                                />
                                <Text style={{marginLeft: "5%", marginTop: 4, fontSize: 20, fontWeight: "bold"}}>
                                {article.title} 
                                </Text>
                                <Text style={{marginLeft: "5%", marginTop: 4, fontSize: 14}}>
                                    {article.desc}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                
            </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    //   alignItems: 'center',
    },
    text: {
      paddingTop: 32,
      fontSize: 48,
      fontWeight: 'bold',
      textAlign: "center"
    },
    strollingButton: {
        marginBottom: 32,
        backgroundColor: '#65558F',
        width: 164,
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center'
      },
    strollingButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});