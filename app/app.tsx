import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardPage from './OnboardPage';
import StartupPage from './StartupPage';
import GoodbyePage from './GoobyePage';
import StartupStrollSearchPage from './StartupStrollSearchPage';
import StrollSearchResultsPage from './StrollSearchResultsPage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <Stack.Navigator initialRouteName="Onboard">
        <Stack.Screen name="Onboard" component={OnboardPage} />
        <Stack.Screen name="Startup" component={StartupPage} />
        <Stack.Screen name="Goodbye" component={GoodbyePage} />
        <Stack.Screen name="StartupSearch" component={StartupStrollSearchPage} />
        <Stack.Screen name="StrollSearchResults" component={StrollSearchResultsPage}/>
      </Stack.Navigator>
  );
};

export default App;
