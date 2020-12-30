import React, { useState, useEffect }  from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar, Text, View, Button } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomePageScreen from "./screens/HomePage";
import LoginScreen from "./screens/Login";
import SignUpScreen from "./screens/SignUp/SignUp";
import ForgotPassword from "./screens/ForgotPassword";
import ProfileScreen from "./screens/Profile";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import firebase from './database/firebase'

const Stack = createStackNavigator();
const Tab  = createBottomTabNavigator();

function Feed() {
  return <HomePageScreen />
}

function Profile() {
  return <ProfileScreen />
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}

function MyTabs() {
  return(
    <Tab.Navigator
      initialRouteName="Profile"
      tabBarOptions={{
        activeTintColor: '#03fff7',
        inactiveTintColor: '#3b3b3b',
        showLabel: false,
        style: {
          position: 'absolute',
          height: 80,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          marginHorizontal: 30,
          bottom: 20,
        }
      }}
    >
      <Tab.Screen
      name="HomePage"
      component={Feed}
      options={{
        tabBarLabel: 'HomePage',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={Notifications}
      options={{
        tabBarLabel: 'Updates',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="bell" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
  )
}


function MyStack() {
  
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  
  
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.fire.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
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

      </Stack.Navigator>
    );
  }
  else{
    return(
      <Stack.Navigator> 

        <Stack.Screen name="Settings" component={MyTabs} options={{headerShown: false}}/>

      </Stack.Navigator>
    )
  }
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