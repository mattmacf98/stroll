import { formatTime, TimeIndicatorRangeLarge } from "@/components/TimeIndicators/TimeRangeIndicator";
import { Buroughs } from "@/contexts/StrollContext";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, NativeSyntheticEvent, TextInputSubmitEditingEventData, FlatList } from "react-native";
import { SCREEN_NAME } from "./app";

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
  const strolls = useQuery(api.strolls.get, {strollId: route.params.strollId})
  const joinStroll = useMutation(api.strolls.join);
  const leaveStroll = useMutation(api.strolls.unjoin);
  const deleteStroll = useMutation(api.strolls.remove);
  const [randomProfilePicIds, setRandomProfilePicIds] = useState<number[]>([]);
  const [messageContent, setMessageContent] = useState('');
  const user = useQuery(api.users.signedInUser);
  const messages = useQuery(api.messages.get, {strollId: route.params.strollId});
  const sendMessage = useMutation(api.messages.send);


  useEffect(() => {
    const ids = []
    for (let i = 0; i < 10; i++) {
      ids.push(Math.floor(Math.random() * profileImages.length));
    }
    setRandomProfilePicIds(ids)
  }, [])

  if (strolls && strolls.length  === 1) {
    const stroll = strolls[0];
    const isOwner = String(stroll.owner) === user?._id;
    const buroughId = Buroughs.findIndex(b => b.name === stroll.location.burough)
    return (
      <View style={styles.container}>
          <Text style={styles.text}>{stroll.title}</Text>
          <TimeIndicatorRangeLarge startTime={stroll.startTime} minutes={Number(stroll.minutes)}/>

          <Image
            source={Buroughs[buroughId].image}
            style={{width: 225, height: 225, marginTop: 16, borderRadius: 10}}
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

            {
              user && stroll.strollers.includes(user._id) &&
              <View style={{borderTopWidth: 1, borderTopColor: "#E6E6E6", width: "100%", top: 60, flex: 1, maxHeight: 200}}>
                  <FlatList
                    style={{height: 50}}
                    data={messages}
                    keyExtractor={(message) => message._id}
                    renderItem={({ item }) => {
                      if (user._id === item.owner) {
                        return (
                          <View style={{flexDirection: "row", borderWidth: 1, borderRadius: 20, borderColor: "#9BA9B0", backgroundColor: "#E5EAFF", alignSelf: "flex-end", padding: 16, marginTop: 16, marginRight: 8}}>
                            <Text>{item.content}</Text>
                            <Text style={{color: "#7E919A", fontSize: 12, marginTop: 2, marginLeft: 6}}>{formatTime(new Date(item.time))}</Text>
                          </View> 
                        )
                      } else {
                        return (
                          <View style={{flexDirection: "row", borderWidth: 1, borderRadius: 20, borderColor: "#9BA9B0", alignSelf: "flex-start", padding: 16, marginTop: 16, marginLeft: 8}}>
                            <Text>{item.content}</Text>
                            <Text style={{color: "#7E919A", fontSize: 12, marginTop: 2, marginLeft: 6}}>{formatTime(new Date(item.time))}</Text>
                          </View> 
                        )
                      }
                    }}
                    contentContainerStyle={{ paddingBottom: 20 }}
                  />
              </View>
            }
            {
              user && stroll.strollers.includes(user._id) &&
              <View style={{position: "relative", top: 60}}>
                 <TextInput
                    placeholder="Enter Your Message"
                    style={{
                      height: 50,
                      width: 240,
                      borderColor: '#C1CFFF',
                      borderWidth: 2,
                      paddingHorizontal: 10,
                      marginTop: 8,
                      borderRadius: 10,
                      alignSelf: "center"
                    }}
                    value={messageContent}
                    onChangeText={setMessageContent}
                    onSubmitEditing={async () => {
                        if (messageContent === "") {
                          return;
                        }
                        await sendMessage({stroll: route.params.strollId, user: user._id, content: messageContent});
                        setMessageContent("");
                      } 
                    }
                  />
              </View>
             
            }
            

            {
               isOwner && 
               <View style={{flex: 1, position: "absolute", bottom: 0}}>
                   <TouchableOpacity style={styles.leaveStrollButton} onPress={() => {
                      deleteStroll({id: stroll._id});
                      navigation.navigate(SCREEN_NAME.RESULUTS)
                   }}>
                       <Text style={styles.strollingButtonText}>Delete Stroll</Text>
                   </TouchableOpacity>
               </View>
            }
            {
              !isOwner && user && stroll.strollers.length < stroll.maxSize && !stroll.strollers.includes(user._id) &&
              <View style={{flex: 1, position: "absolute", bottom: 0}}>
                  <TouchableOpacity style={styles.strollingButton} onPress={() => joinStroll({strollId: stroll._id, userId: user._id})}>
                      <Text style={styles.strollingButtonText}>Join Stroll</Text>
                  </TouchableOpacity>
              </View>
            }
            {
              !isOwner && user && stroll.strollers.includes(user._id) &&
              <View style={{flex: 1, position: "absolute", bottom: 0}}>
                  <TouchableOpacity style={styles.leaveStrollButton} onPress={() => leaveStroll({strollId: stroll._id, userId: user._id})}>
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
      flexDirection: "column",
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