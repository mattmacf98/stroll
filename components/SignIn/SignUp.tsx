import { profileImages } from "@/constants/profilePics";
import { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { styles } from "./styles";
import { IAuthFormProps } from "./interfaces";

export const SignUpForm = (props: IAuthFormProps) => {
    const [profilePicIndex, setProfilePicIndex] = useState(0);
    const [nameText, setNameText] = useState('');
    const [password, setPassword] = useState('');
    
    const handleImageTap = () => {
      setProfilePicIndex((prevIndex) => (prevIndex + 1) % profileImages.length);
    }
    const handleTextInputChange = (text: string) => {
      setNameText(text);
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Sign Up</Text>
        <View style={styles.topHalf}>
          <TouchableOpacity onPress={handleImageTap} style={styles.imageContainer}>
            <Image
                source={profileImages[profilePicIndex]}
                style={styles.image}
                resizeMode="contain"
              />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Your Username..."
            value={nameText}
            onChangeText={handleTextInputChange}
          />
        </View>
  
        <View style={{ marginTop: 64}}>
          <Text style={{textAlign: "center", position: "relative", right: 56, fontSize: 16, fontWeight: "bold"}}>Create Password</Text>
          <TextInput
            style={styles.paswordInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={props.switchAuthMode}>
            <Text style={{textAlign: "center", position: "relative", right: 36, fontSize: 14, marginTop: 8, color: "#C2BECB"}}>Already Have an Account?</Text>
          </TouchableOpacity>
        </View>
        
        {nameText.length > 0 && password.length > 0 && (
            <TouchableOpacity style={styles.strollingButton} onPress={ async () => {
                // const result = await signIn("password", {email: nameText, name: nameText, password: password, profilePicId: BigInt(profilePicIndex), flow: "signUp"});
                // if (result.signingIn) {
                //   props.navigation.navigate("StartupSearch");
                // }
              }}>
              <Text style={styles.strollingButtonText}>Start Strolling</Text>
            </TouchableOpacity>
        )}
      </View>
    )
}
