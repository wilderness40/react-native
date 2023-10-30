import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import LandingScreen from './screens/LandingScreen';
import App from './App';

const Stack = createNativeStackNavigator();

function stackRouter() {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    checkLoginState = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn()
        setIsLoggedIn(isSignedIn)
    }
    useEffect(() => {
        checkLoginState()
    },[])
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{headerShown: false}} // 탭메뉴 헤더와 겹치지 않도록 함
      >
        {!isLoggedIn && <Stack.Screen name="Landing" component={LandingScreen} /> }
        <Stack.Screen name="App" component={App} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default stackRouter;
