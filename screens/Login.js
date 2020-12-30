import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from "@expo/vector-icons";

import firebase from '../database/firebase'

import AsyncStorage from "@react-native-community/async-storage";

export default function App(props) {

  const [hidePassword, setHidePassword] = useState(true);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function clearErrors() {
    setPasswordError("");
    setEmailError("");
  } 

  loadUserDetails = async () => {
    try {
      const infoValue = await AsyncStorage.getItem('userDetails')
      let userDetailsObject = JSON.parse(infoValue);
      setEmail(userDetailsObject.textval1);
      setPassword(userDetailsObject.textval2)
    } catch (error) {
      console.log(error);
    }
  }

  saveUserDetails = () => {
    let userDetailsObject = {};
    userDetailsObject.textval1 = email;
    userDetailsObject.textval2 = password;
    try {
        AsyncStorage.setItem('userDetails', JSON.stringify(userDetailsObject));
    } catch (error) {
      console.log(error);
  }
}

  useEffect(() => {
    loadUserDetails();
  }, []);

  function handleLogin() {
    clearErrors();
    firebase.fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(saveUserDetails())
      .catch((err) =>{
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;

          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      })
  }

  function handleChangeTextPassword(text) {
    setPassword(text)
  }

  function handleChangeTextEmail(text) {
    setEmail(text);
  }

  function handleShowPassword() {
    setHidePassword((bool) => !bool)
  }

  function handleCreateAccount() {
    props.navigation.navigate("SignUpScreen")
  }

  function handleForgotPassword() {
    props.navigation.navigate("ForgotPassword")
  }

  return (
    <View style={{flex: 1,backgroundColor: '#fff',}}>
    
      <View style={styles.header}>
        <Text style={styles.title}>Hello.</Text>
        <Text style={[styles.title], {fontSize: 30, color: "gray"}}>Welcome Back</Text>
      </View>

      <View style={{flex: 1,marginRight: 20}}>
        <View style={{marginLeft: 30}}>
          <Text  style={{opacity: 0.3,}}>EMAIL</Text>
          <TextInput 
            style={{borderBottomColor: "gray",borderBottomWidth: 1,paddingTop: 10,}}
            placeholder="email"
            autoCorrect={false}
            autoCapitalize = 'none'
            onChangeText={handleChangeTextEmail}
            value={email}
          />
          <Text  style={{opacity: 0.6,color: "red", textAlign: "center"}}>{emailError}</Text>
        </View>
        
        <View style={{marginLeft: 30, marginTop: 40}}>
          <Text style={{paddingTop: 10, opacity: 0.3}}>PASSWORD</Text>

          <View style={{flexDirection: "row", justifyContent: 'center',alignItems: 'center',}}>
          
            <TextInput  
              style={styles.textInput}
              placeholder="password"
              autoCorrect={false}
              autoCapitalize = 'none'
              secureTextEntry={hidePassword}
              onChangeText={handleChangeTextPassword}
              value={password}
            />
            
            <TouchableOpacity onPress={handleShowPassword} style={{padding: 5}}>
              <Feather 
                name={hidePassword ?  "eye" : "eye-off"}   
                size={20}
                style={{marginLeft: 20}}
              />
            </TouchableOpacity>
          </View>
          <Text  style={{opacity: 0.6,color: "red", textAlign: "center"}}>{passwordError}</Text>
          
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={{textAlign: "right", marginTop: 10, marginRight: 20, color: "gray"}}>Forgot Password?</Text>
          </TouchableOpacity>

        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleLogin}>
          <View style={styles.button}>
            <Text style={{textAlign: "center",color: "white"}}>LOGIN</Text>
          </View>
        </TouchableOpacity>
      
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text  style={{textAlign: "center", marginTop: 20, marginRight: 20, color: "gray"}}>Create Account</Text>
        </TouchableOpacity>
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    flex: 1,
    paddingTop: 70,
    marginLeft: 30,
  },
  title:{
    fontSize: 30,
    fontWeight: "bold"
  },
  footer:{
    flex: 1,
    paddingTop: 10,
    margin: 30,
  },
  textInput:{
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    paddingTop: 10,
    flex: 1
  },
  button:{
    backgroundColor: "#2196F3", 
    padding: 15, 
    borderRadius: 10, 
    margin: 20, 
    marginTop: 40
  }
});
