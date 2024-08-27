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
import { SCREEN_NAME } from '@/constants/enums';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <Stack.Navigator initialRouteName={SCREEN_NAME.SIGN_IN}>
        <Stack.Screen name={SCREEN_NAME.SIGN_IN} component={OnboardPage} />
        <Stack.Screen name={SCREEN_NAME.START} component={StartupPage} 
          options={({ navigation }) => ({
            headerLeft: () => (<View/>),
          })}
        />
        <Stack.Screen name={SCREEN_NAME.GOODBYE}component={GoodbyePage} 
          options={({ navigation }) => ({
            headerLeft: () => (
              <Button
                onPress={() => navigation.navigate(SCREEN_NAME.START)}
                title="Back"
                color="#000"
              />
            ),
          })}
        />
        <Stack.Screen name={SCREEN_NAME.SEARCH} component={StartupStrollSearchPage} 
          options={({ navigation }) => ({
            headerLeft: () => (
              <Button
                onPress={() => navigation.navigate(SCREEN_NAME.HOME)}
                title="Back"
                color="#000"
              />
            ),
          })}
        />
        <Stack.Screen name={SCREEN_NAME.CREATE} component={CreateStrollPage}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Button
                onPress={() => navigation.navigate(SCREEN_NAME.RESULUTS)}
                title="Back"
                color="#000"
              />
            ),
          })}
        />
        <Stack.Screen name={SCREEN_NAME.RESULUTS} component={StrollSearchResultsPage} 
          options={({ navigation }) => ({
            headerLeft: () => (
              <Button
                onPress={() => navigation.navigate(SCREEN_NAME.HOME)}
                title="Back"
                color="#000"
              />
            ),
          })}
        />
        <Stack.Screen name={SCREEN_NAME.HOME} component={HomePage}
          options={({ navigation }) => ({
            headerLeft: () => (<View/>),
          })}
        />
        <Stack.Screen
          name={SCREEN_NAME.DETAIL}
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
