import { formatTime, TimeIndicatorRange, TimeIndicatorRangeLarge } from "@/components/TimeIndicators/TimeRangeIndicator";
import { Buroughs, StrollContext } from "@/contexts/StrollContext";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

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

export default function StrollDetailPage({route}: {route: any}) {
  const {messages} = useContext(StrollContext);
  const strolls = useQuery(api.strolls.get, {strollId: route.params.strollId})

  if (strolls && strolls.length  === 1) {
    const stroll = strolls[0];
    return (
      <View style={styles.container}>
          <Text style={styles.text}>{stroll.title}</Text>
          <TimeIndicatorRangeLarge startTime={stroll.startTime} minutes={Number(stroll.minutes)}/>

          <Image
            source={Buroughs[0].image}
            style={{width: 300, height: 300, marginTop: 16, borderRadius: 10}}
          />

            <View style={{flexDirection: "row", marginTop: 32}}>
                {
                    Array.from({ length: stroll.strollers.length }, (_, i) => i).map((index) => (
                        <Image
                            key={index}
                            source={profileImages[Math.floor(Math.random() * profileImages.length)]}
                            style={{width: 45, height: 45, position: "relative", right: 100 + 25 *index}}
                            resizeMode="contain"
                        />
                    ))
                }
            </View>
            <Text style={{fontSize: 16, fontWeight: "bold", position: "relative", color: "#C4C4C4", right: 125, top: 10}}>{stroll.strollers.length}/{Number(stroll.maxSize)}</Text>

            <View style={{borderTopWidth: 1, borderTopColor: "#E6E6E6", width: "100%", position: "relative", top: 16, flex: 1, flexDirection: "column", flexWrap: "wrap"}}>
                  {messages.map((message, index) => (
                    <View key={index} style={{width: "100%", marginTop: 16, marginHorizontal: 16}}>
                      <View style={{flexDirection: "row", borderWidth: 1, borderRadius: 20, borderColor: "#9BA9B0", alignSelf: "flex-start", padding: 16}}>
                        <Text>{message.content}</Text>
                        <Text style={{color: "#7E919A", fontSize: 12, marginTop: 2, marginLeft: 6}}>{formatTime(new Date(message.time))}</Text>
                      </View>  
                    </View>
                  ))}
            </View>
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
    }
  });