import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import firebase from "../database/firebase";

export default function App(props) {

  const [email, setEmail] = useState("")
  const [emailEror, setEmailError] = useState("")

  function handleChangeTextEmail(text) {
    setEmail(text)
  }

  function handleGoBack() {
    props.navigation.goBack();
  }

  function clearError() {
    setEmailError("");
  }

  function showMessageAndGoBack() {
    alert("a mail has been sent to your mailbox");
    handleGoBack();
  }

  function handleForgotPassword() {
    clearError();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(showMessageAndGoBack())
      .catch(function (e) {
        setEmailError(e.message)
      })
  }

  return (
    <View style={{flex: 1,backgroundColor: '#fff',}}>
      
      <View style={styles.header}>
        <Text style={styles.title}>Forgot</Text>
        <Text style={[styles.title], {fontSize: 30, color: "gray"}}>Password?</Text>
      </View>

      <View style={{flex: 1,marginRight: 20}}>
        <View style={{marginLeft: 30}}>
          <Text  style={{opacity: 0.3,}}>USERNAME</Text>
          <TextInput 
            style={styles.textInput}
            placeholder="email"
            autoCorrect={false}
            autoCapitalize = 'none'
            onChangeText={handleChangeTextEmail}
          />
          <Text  style={{opacity: 0.6,color: "red", textAlign: "center"}}></Text>
        </View>
        
        <Text style={{opacity: 0.6,color: "red", textAlign: "center"}}>{emailEror}</Text>

      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleForgotPassword}>
          <View style={{backgroundColor: "#2196F3", padding: 15, borderRadius: 10, margin: 20, marginTop: 40}}>
            <Text style={{textAlign: "center",color: "white"}}>Reset Password</Text>
          </View>
        </TouchableOpacity>
            
        <TouchableOpacity onPress={handleGoBack}>
          <Text  style={{textAlign: "center", marginTop: 20, marginRight: 20, color: "gray"}}>Go Back</Text>
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
    paddingTop: 10
  }
});
