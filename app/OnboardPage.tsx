import { StrollContext } from "@/contexts/StrollContext";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useContext, useEffect, useRef, useState } from "react";
import { Dimensions, Image, Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";

const { height } = Dimensions.get('window');

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
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.SIGN_UP)

  const switchAuthMode = () => {
    authMode === AuthMode.SIGN_IN ? setAuthMode(AuthMode.SIGN_UP) : setAuthMode(AuthMode.SIGN_IN);
  }
  
  if (authMode === AuthMode.SIGN_UP) {
    return <SignUpForm navigation={navigation} switchAuthMode={switchAuthMode}/>
  } else {
    return <SignInForm navigation={navigation} switchAuthMode={switchAuthMode}/>
  }
}

interface ISignUpFormProps {
  navigation: any,
  switchAuthMode: () => void
}
const SignUpForm = (props: ISignUpFormProps) => {
  const [profilePicIndex, setProfilePicIndex] = useState(0);
  const [nameText, setNameText] = useState('');
  const [password, setPassword] = useState('');
  const {setUserId} =  useContext(StrollContext);
  const createUser = useMutation(api.users.create);

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
              const userId = await createUser({name: nameText, profilePicId: BigInt(profilePicIndex)});
              setUserId(userId);
              props.navigation.navigate("Startup");
            }}>
            <Text style={styles.strollingButtonText}>Start Strolling</Text>
          </TouchableOpacity>
      )}
    </View>
  )
}

interface ISignInFormProps {
  navigation: any,
  switchAuthMode: () => void,
}
const SignInForm = (props: ISignInFormProps) => {
  const [nameText, setNameText] = useState('');
  const [password, setPassword] = useState('');
  const {setUserId} =  useContext(StrollContext);
  const getUserByName = useQuery(api.users.getByName, {name: nameText});
  const profilePicId = useRef<number>(0);

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
              if (getUserByName && getUserByName.length > 0) {
                const user = getUserByName[0];
                setUserId(user._id);
                props.navigation.navigate("Startup");
              }
              
            }}>
            <Text style={styles.strollingButtonText}>Start Strolling</Text>
          </TouchableOpacity>
      )}
    </View>
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
