import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from "@expo/vector-icons";
import firebase from "../../database/firebase";

import SignUpHeader from './SingUpHeader';

export default function App(props) {

  const [hidePassword, setHidePassword] = useState(true);
  const [hidePassword2, setHidePassword2] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password2Error, setPassword2Error] = useState("");

  const [image, setImage] = useState(require("../../assets/DefaultAvatar.png"));
 
  function clearErrors() {
    setEmailError("");
    setPasswordError("")
    setPassword2Error("")
  }

  function handleSignUp() {
    clearErrors();
    if (passwordIsPassword2()) 
      signUser(); 
    else
      setPassword2Error("Wrong Password");
  }

  const signUser = async () => {
    try {
      await firebase.fire.auth().createUserWithEmailAndPassword(email,password,);

      const uid = firebase.fire.auth().currentUser.uid;

      const user = {
        name: null,
        age: null,
        password: password,
        email: email,
      };
      
      await firebase.db.collection('users').doc(uid).set(user);

    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(err.message);
          break;

        case "auth/weak-password":
          setPasswordError(err.message);
          break;
      }
    }
  };

  function passwordIsPassword2() {
    return password2 == password;
  }

  function handleEmailTextChange(text) {
    setEmail(text);
  }

  function handlePasswordTextChange(text) {
    setPassword(text);
  }

  function handlePassword2TextChange(text) {
    setPassword2(text);
  }

  function handleGoBack() {
    props.navigation.goBack();
  }

  function handleShowPassword() {
    setHidePassword((bool) => !bool)
  }

  function handleShowPassword2() {
    setHidePassword2((bool) => !bool)
  }

  function getHeader() {
    return <SignUpHeader />
  }

  function getBody() {
    return <View style={{ flex: 1, marginRight: 20 }}>
      <View style={{ marginLeft: 30 }}>
        <Text style={{ opacity: 0.3, }}>EMAIL</Text>
        <TextInput
          style={{ borderBottomColor: "gray", borderBottomWidth: 1, marginTop: 10 }}
          placeholder="email"
          autoCorrect={false}
          autoCapitalize='none'
          onChangeText={handleEmailTextChange} />
        <Text style={{ opacity: 0.6, color: "red", textAlign: "center" }}>{emailError}</Text>
      </View>

      <View style={{ marginLeft: 30, marginTop: 0 }}>
        <Text style={{ paddingTop: 10, opacity: 0.3 }}>PASSWORD</Text>

        <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', }}>

          <TextInput
            style={[styles.textInput]}
            placeholder="password"
            autoCorrect={false}
            autoCapitalize='none'
            secureTextEntry={hidePassword}
            onChangeText={handlePasswordTextChange} />


          <TouchableOpacity onPress={handleShowPassword} style={{ padding: 5 }}>
            <Feather
              name={hidePassword ? "eye" : "eye-off"}
              size={20}
              style={{ marginLeft: 20 }} />
          </TouchableOpacity>
        </View>
        <Text style={{ opacity: 0.6, color: "red", textAlign: "center" }}>{passwordError}</Text>
      </View>

      <View style={{ marginLeft: 30, marginTop: 0, }}>
        <Text style={{ paddingTop: 10, opacity: 0.3 }}>PASSWORD</Text>

        <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', }}>

          <TextInput
            style={[styles.textInput]}
            placeholder="password"
            autoCorrect={false}
            autoCapitalize='none'
            secureTextEntry={hidePassword2}
            onChangeText={handlePassword2TextChange} />

          <TouchableOpacity onPress={handleShowPassword2}>
            <Feather
              name={hidePassword2 ? "eye" : "eye-off"}
              size={20}
              style={{ marginLeft: 20 }} />
          </TouchableOpacity>
        </View>
        <Text style={{ opacity: 0.6, color: "red", textAlign: "center" }}>{password2Error}</Text>
      </View>
    </View>;
  }

  return (
    <View style={{flex: 1,backgroundColor: '#fff',}}>
      {getHeader()}
      {getBody()}
      {getFooter()}
    </View>
  );

  function getFooter() {
    return <View style={styles.footer}>
      <TouchableOpacity onPress={handleSignUp}>
        <View style={styles.button}>
          <Text style={{ textAlign: "center", color: "white" }}>SIGN UP</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleGoBack}>
        <Text style={{ textAlign: "center", marginTop: 20, marginRight: 20, color: "gray" }}>Go Back</Text>
      </TouchableOpacity>

    </View>;
  }
}

const styles = StyleSheet.create({
  footer:{
    flex: 1,
    paddingTop: 30,
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
    marginTop: 40, 
  },
});
