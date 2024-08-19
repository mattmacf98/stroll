import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardPage from './OnboardPage';
import StartupPage from './StartupPage';
import GoodbyePage from './GoobyePage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <Stack.Navigator initialRouteName="Onboard">
        <Stack.Screen name="Onboard" component={OnboardPage} />
        <Stack.Screen name="Startup" component={StartupPage} />
        <Stack.Screen name="Goodbye" component={GoodbyePage} />
      </Stack.Navigator>
  );
};

export default App;
