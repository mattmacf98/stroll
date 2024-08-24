import { SignInForm } from "@/components/SignIn/SignIn";
import { SignUpForm } from "@/components/SignIn/SignUp";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";

enum AuthMode {
  SIGN_IN,
  SIGN_UP
}

const SignIn = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
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

export default SignIn;