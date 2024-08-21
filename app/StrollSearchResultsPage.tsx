import { BuroughCard } from "@/components/Burough/BuroughCard";
import { TimeIndicator } from "@/components/TimeIndicator/TimeIndicator";
import { Buroughs, StrollContext } from "@/contexts/StrollContext";
import { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";

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