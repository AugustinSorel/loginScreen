import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar, View } from 'react-native';

import HomePageScreen from "./screens/HomePage";
import LoginScreen from "./screens/Login";
import SignUpScreen from "./screens/SignUp";
import ForgotPassword from "./screens/ForgotPassword";

import firebase from './database/firebase'


const Stack = createStackNavigator();

function MyStack() {
  return(
    <Stack.Navigator> 

      <Stack.Screen 
        name = "LoginScreen"
        component= {LoginScreen}
        options={{ headerShown: false}}
      />


      <Stack.Screen 
        name = "SignUpScreen"
        component= {SignUpScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen 
        name = "ForgotPassword"
        component= {ForgotPassword}
        options={{ headerShown: false}}
      />

      <Stack.Screen 
        name = "HomePageScreen"
        component= {HomePageScreen}
        options={{title: 'HomePage'}}
      />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
      <StatusBar hidden/>
    </View>
  );
}