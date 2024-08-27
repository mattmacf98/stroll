import { SCREEN_NAME } from "@/constants/enums";
import { api } from "@/convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/dist/react";
import { useQuery } from "convex/react";
import { useEffect, useRef, useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from "react-native";

enum AuthMode {
  SIGN_IN,
  SIGN_UP
}
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

export default function OnboardPage({navigation}: any) {
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.SIGN_IN);

  const switchAuthMode = () => {
    authMode === AuthMode.SIGN_IN ? setAuthMode(AuthMode.SIGN_UP) : setAuthMode(AuthMode.SIGN_IN);
  }
  
  if (authMode === AuthMode.SIGN_UP) {
    return <SignUpForm navigation={navigation} switchAuthMode={switchAuthMode}/>
  } else {
    return <SignInForm navigation={navigation} switchAuthMode={switchAuthMode}/>
  }
}

interface IAuthFormProps {
  switchAuthMode: () => void
  navigation: any
}
const SignUpForm = (props: IAuthFormProps) => {
  const [profilePicIndex, setProfilePicIndex] = useState(0);
  const [nameText, setNameText] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuthActions();
  
  const handleImageTap = () => {
    setProfilePicIndex((prevIndex) => (prevIndex + 1) % profileImages.length);
  }
  const handleTextInputChange = (text: string) => {
    setNameText(text);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
              const result = await signIn("password", {email: nameText, name: nameText, password: password, profilePicId: BigInt(profilePicIndex), flow: "signUp"});
              if (result.signingIn) {
                props.navigation.navigate(SCREEN_NAME.SEARCH);
              }
            }}>
            <Text style={styles.strollingButtonText}>Start Strolling</Text>
          </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  )
}

const SignInForm = (props: IAuthFormProps) => {
  const [nameText, setNameText] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuthActions();
  const profilePicId = useRef<number>(0);
  const user = useQuery(api.users.signedInUser);

  useEffect(() => {
    profilePicId.current = Math.floor(Math.random() * profileImages.length)
  }, [])

  const handleTextInputChange = (text: string) => {
    setNameText(text);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
                if (user?.strolling) {
                  props.navigation.navigate(SCREEN_NAME.SEARCH);
                } else {
                  props.navigation.navigate(SCREEN_NAME.START);
                }
              }
            }}>
            <Text style={styles.strollingButtonText}>Start Strolling</Text>
          </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
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
