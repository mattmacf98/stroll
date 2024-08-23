import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardPage from './OnboardPage';
import StartupPage from './StartupPage';
import GoodbyePage from './GoobyePage';
import StartupStrollSearchPage from './StartupStrollSearchPage';
import StrollSearchResultsPage from './StrollSearchResultsPage';
import StrollDetailPage from './StrollDetailPage';
import CreateStrollPage from './CreateStrollPage';
import HomePage from './HomePage';
import { Button, View } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <Stack.Navigator initialRouteName="Onboard">
        <Stack.Screen name="Onboard" component={OnboardPage} />
        <Stack.Screen name="Startup" component={StartupPage} 
          options={({ navigation }) => ({
            headerLeft: () => (<View/>),
          })}
        />
        <Stack.Screen name="Goodbye" component={GoodbyePage} 
          options={({ navigation }) => ({
            headerLeft: () => (
              <Button
                onPress={() => navigation.navigate('Startup')}
                title="Back"
                color="#000"
              />
            ),
          })}
        />
        <Stack.Screen name="StartupSearch" component={StartupStrollSearchPage} 
          options={({ navigation }) => ({
            headerLeft: () => (
              <Button
                onPress={() => navigation.navigate('Home')}
                title="Back"
                color="#000"
              />
            ),
          })}
        />
        <Stack.Screen name="CreateStroll" component={CreateStrollPage}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Button
                onPress={() => navigation.navigate('StrollSearchResults')}
                title="Back"
                color="#000"
              />
            ),
          })}
        />
        <Stack.Screen name="StrollSearchResults" component={StrollSearchResultsPage} 
          options={({ navigation }) => ({
            headerLeft: () => (
              <Button
                onPress={() => navigation.navigate('Home')}
                title="Back"
                color="#000"
              />
            ),
          })}
        />
        <Stack.Screen name="Home" component={HomePage}
          options={({ navigation }) => ({
            headerLeft: () => (<View/>),
          })}
        />
        <Stack.Screen
          name="StrollDetail"
          component={StrollDetailPage}
          initialParams={{ strollId: undefined }}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Button
                onPress={() => navigation.goBack()}
                title="Back"
                color="#000"
              />
            ),
          })}
        />
      </Stack.Navigator>
  );
};

export default App;
