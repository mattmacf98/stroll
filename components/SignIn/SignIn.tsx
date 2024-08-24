import { profileImages } from "@/constants/profilePics";
import { useState, useRef, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, Image } from "react-native";
import { IAuthFormProps } from "./interfaces";
import { styles } from "./styles";
import { useAuthActions } from "@convex-dev/auth/dist/react";

export const SignInForm = (props: IAuthFormProps) => {
    const [nameText, setNameText] = useState('');
    const [password, setPassword] = useState('');
    const profilePicId = useRef<number>(0);
    const { signIn } = useAuthActions();

    useEffect(() => {
      profilePicId.current = Math.floor(Math.random() * profileImages.length)
    }, [])
  
    const handleTextInputChange = (text: string) => {
      setNameText(text);
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Sign In</Text>
        <View style={styles.topHalf}>
          <View style={styles.imageContainer}>
            <Image
                source={profileImages[profilePicId.current]}
                style={styles.image}
                resizeMode="contain"
              />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Your Username..."
            value={nameText}
            onChangeText={handleTextInputChange}
          />
        </View>
  
        <View style={{ marginTop: 64}}>
          <Text style={{textAlign: "center", position: "relative", right: 80, fontSize: 16, fontWeight: "bold"}}>Password</Text>
          <TextInput
            style={styles.paswordInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={props.switchAuthMode}>
            <Text style={{textAlign: "center", position: "relative", right: 64, fontSize: 14, marginTop: 8, color: "#C2BECB"}}>Create Account</Text>
          </TouchableOpacity>
        </View>
  
        {nameText.length > 0 && password.length > 0 && (
            <TouchableOpacity style={styles.strollingButton} onPress={ async () => {
                const result = await signIn("password", {email: nameText, password: password, flow: "signIn"});
                if (result.signingIn) {
                    console.log("Signed in")
                //   if (user?.strolling) {
                //     props.navigation.navigate("StartupSearch");
                //   } else {
                //     props.navigation.navigate("Startup");
                //   }
                }
              }}>
              <Text style={styles.strollingButtonText}>Start Strolling</Text>
            </TouchableOpacity>
        )}
      </View>
    )
  }