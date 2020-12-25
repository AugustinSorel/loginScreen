import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from "@expo/vector-icons";

export default function App(props) {

  const [hidePassword, setHidePassword] = useState(true);
  const [hidePassword2, setHidePassword2] = useState(true);

  function handleGoBack() {
    props.navigation.goBack();
  }

  function handleShowPassword() {
    setHidePassword((bool) => !bool)
  }

  function handleShowPassword2() {
    setHidePassword2((bool) => !bool)
  }

  return (
    <View style={{flex: 1,backgroundColor: '#fff',}}>
      
      <View style={styles.header}>
        <Text style={styles.title}>Create Account.</Text>
        <Text style={[styles.title], {fontSize: 25, color: "gray"}}>Sign up to get started</Text>
      </View>

      <View style={{flex: 1, marginRight: 20}}>
        <View style={{marginLeft: 30}}>
          <Text  style={{opacity: 0.3,}}>USERNAME</Text>
          <TextInput 
            style={{borderBottomColor: "gray",borderBottomWidth: 1,marginTop: 10}}
            placeholder="email"
            autoCorrect={false}
            autoCapitalize = 'none'
          />
          <Text  style={{opacity: 0.6,color: "red", textAlign: "center"}}></Text>
        </View>
        
        <View style={{marginLeft: 30, marginTop: 0}}>
          <Text style={{paddingTop: 10, opacity: 0.3}}>PASSWORD</Text>

          <View style={{flexDirection: "row", justifyContent: 'center',alignItems: 'center',}}>
          
            <TextInput  
              style={[styles.textInput]}
              placeholder="password"
              autoCorrect={false}
              autoCapitalize = 'none'
              secureTextEntry={hidePassword}
            />
            

            <TouchableOpacity onPress={handleShowPassword} style={{padding: 5}}>
              <Feather 
                name={hidePassword ?  "eye" : "eye-off"}   
                size={20}
                style={{marginLeft: 20}}
              />
            </TouchableOpacity>
          </View>
          <Text  style={{opacity: 0.6,color: "red", textAlign: "center"}}></Text>
        </View>

        <View style={{marginLeft: 30, marginTop: 0,}}>
          <Text style={{paddingTop: 10, opacity: 0.3}}>PASSWORD</Text>

          <View style={{flexDirection: "row", justifyContent: 'center',alignItems: 'center',}}>
          
            <TextInput  
              style={[styles.textInput]}
              placeholder="password"
              autoCorrect={false}
              autoCapitalize = 'none'
              secureTextEntry={hidePassword2}
            />

              <TouchableOpacity onPress={handleShowPassword2}> 
                <Feather 
                  name={hidePassword2 ?  "eye" : "eye-off"} 
                  size={20}
                  style={{marginLeft: 20}}
                />
            </TouchableOpacity>
          </View>
           <Text  style={{opacity: 0.6,color: "red", textAlign: "center"}}></Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={{textAlign: "center",color: "white"}}>SIGN UP</Text>
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
