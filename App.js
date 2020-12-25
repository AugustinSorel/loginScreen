import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomePageScreen from "./screens/HomePage";
import LoginScreen from "./screens/Login";
import SignInScreen from "./screens/SignIn";
import { StatusBar, View } from 'react-native';

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
        name = "SignInScreen"
        component= {SignInScreen}
        options={{title: 'SignIn'}}
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