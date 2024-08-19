import { useState } from "react";
import { Dimensions, Image, Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";

const { height } = Dimensions.get('window');

export default function OnboardPage({navigation}) {
  const [profilePicIndex, setProfilePicIndex] = useState(0);
  const [nameText, setNameText] = useState('');
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
  
  const handleImageTap = () => {
    setProfilePicIndex((prevIndex) => (prevIndex + 1) % profileImages.length);
  }

  const handleTextInputChange = (text: string) => {
    setNameText(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <TouchableOpacity onPress={handleImageTap} style={styles.touchableContainer}>
          <Image
              source={profileImages[profilePicIndex]}
              style={styles.image}
              resizeMode="contain"
            />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Your Name..."
          value={nameText}
          onChangeText={handleTextInputChange}
        />
      </View>
      {nameText.length > 0 && (
          <TouchableOpacity style={styles.strollingButton} onPress={() => navigation.navigate("Startup")}>
            <Text style={styles.strollingButtonText}>Start Strolling</Text>
          </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topHalf: {
    height: height / 2,
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
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  touchableContainer: {
    width: '80%',
    height: '80%',
  },
  strollingButton: {
    position: 'absolute',
    bottom: 50,
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
