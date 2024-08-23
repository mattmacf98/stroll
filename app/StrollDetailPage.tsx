import { formatTime, TimeIndicatorRange, TimeIndicatorRangeLarge } from "@/components/TimeIndicators/TimeRangeIndicator";
import { Buroughs, StrollContext } from "@/contexts/StrollContext";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { unjoin } from "@/convex/strolls";
import { useMutation, useQuery } from "convex/react";
import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

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

export default function StrollDetailPage({navigation, route}: {navigation: any, route: any}) {
  const {messages, userId} = useContext(StrollContext);
  const strolls = useQuery(api.strolls.get, {strollId: route.params.strollId})
  const joinStroll = useMutation(api.strolls.join);
  const leaveStroll = useMutation(api.strolls.unjoin);
  const deleteStroll = useMutation(api.strolls.remove);
  const [randomProfilePicIds, setRandomProfilePicIds] = useState<number[]>([])

  useEffect(() => {
    const ids = []
    for (let i = 0; i < 10; i++) {
      ids.push(Math.floor(Math.random() * profileImages.length));
    }
    setRandomProfilePicIds(ids)
  }, [])

  if (strolls && strolls.length  === 1) {
    const stroll = strolls[0];
    const isOwner = String(stroll.owner) === userId;
    return (
      <View style={styles.container}>
          <Text style={styles.text}>{stroll.title}</Text>
          <TimeIndicatorRangeLarge startTime={stroll.startTime} minutes={Number(stroll.minutes)}/>

          <Image
            source={Buroughs[0].image}
            style={{width: 250, height: 250, marginTop: 16, borderRadius: 10}}
          />

            <View style={{flexDirection: "row", marginTop: 32}}>
                {
                    Array.from({ length: stroll.strollers.length }, (_, i) => i).map((index) => (
                        <Image
                            key={index}
                            source={profileImages[randomProfilePicIds[index]]}
                            style={{width: 45, height: 45, position: "absolute", right: 100 - 25 *index}}
                            resizeMode="contain"
                        />
                    ))
                }
            </View>
            <Text style={{fontSize: 16, fontWeight: "bold", position: "relative", color: "#C4C4C4", right: 100, top: 50}}>{stroll.strollers.length}/{Number(stroll.maxSize)}</Text>

            <View style={{borderTopWidth: 1, borderTopColor: "#E6E6E6", width: "100%", position: "relative", top: 60, flex: 1, flexDirection: "column", flexWrap: "wrap"}}>
                  {messages.map((message, index) => (
                    <View key={index} style={{width: "100%", marginTop: 16, marginHorizontal: 16}}>
                      <View style={{flexDirection: "row", borderWidth: 1, borderRadius: 20, borderColor: "#9BA9B0", alignSelf: "flex-start", padding: 16}}>
                        <Text>{message.content}</Text>
                        <Text style={{color: "#7E919A", fontSize: 12, marginTop: 2, marginLeft: 6}}>{formatTime(new Date(message.time))}</Text>
                      </View>  
                    </View>
                  ))}
            </View>

            {
               isOwner && 
               <View style={{flex: 1, position: "absolute", bottom: 0}}>
                   <TouchableOpacity style={styles.leaveStrollButton} onPress={() => {
                      deleteStroll({id: stroll._id});
                      navigation.navigate("StrollSearchResults")
                   }}>
                       <Text style={styles.strollingButtonText}>Delete Stroll</Text>
                   </TouchableOpacity>
               </View>
            }
            {
              !isOwner && stroll.strollers.length < stroll.maxSize && !stroll.strollers.includes(userId as Id<"users">) &&
              <View style={{flex: 1, position: "absolute", bottom: 0}}>
                  <TouchableOpacity style={styles.strollingButton} onPress={() => joinStroll({strollId: stroll._id, userId: userId as Id<"users">})}>
                      <Text style={styles.strollingButtonText}>Join Stroll</Text>
                  </TouchableOpacity>
              </View>
            }
            {
              !isOwner && stroll.strollers.includes(userId as Id<"users">) &&
              <View style={{flex: 1, position: "absolute", bottom: 0}}>
                  <TouchableOpacity style={styles.leaveStrollButton} onPress={() => leaveStroll({strollId: stroll._id, userId: userId as Id<"users">})}>
                      <Text style={styles.strollingButtonText}>Leave Stroll</Text>
                  </TouchableOpacity>
              </View>
            }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    text: {
      paddingTop: 16,
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: "center",
      marginBottom: 16
    },
    strollingButton: {
      marginBottom: 64,
      backgroundColor: '#65558F',
      width: 128,
      paddingVertical: 15,
      borderRadius: 25,
      alignItems: 'center'
    },
    leaveStrollButton: {
      marginBottom: 64,
      backgroundColor: '#EF354E',
      width: 128,
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