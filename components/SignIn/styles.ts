import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    headerText: {
      fontSize: 36,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 32,
      marginBottom: 32
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    topHalf: {
      height: "30%",
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      height: 40,
      borderColor: 'transparent',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginHorizontal: 20,
      fontSize: 18,
      fontWeight: 'bold',
      backgroundColor: '#ffffff',
    },
    paswordInput: {
      height: 60,
      width: 240,
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 10,
      marginTop: 8,
      borderRadius: 4,
      alignSelf: "center"
    },
    image: {
      alignSelf: "center",
      width: '100%',
      height: '100%',
    },
    imageContainer: {
      width: '70%',
      height: '70%',
    },
    strollingButton: {
      position: 'absolute',
      bottom: 70,
      left: 20,
      right: 20,
      backgroundColor: '#65558F',
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    strollingButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    }
  });