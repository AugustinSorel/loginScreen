import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

export default function App(props) {

  function handleCreateAccount() {
    props.navigation.navigate("SignInScreen")
  }

  return (
    <View style={{flex: 1,backgroundColor: '#fff',}}>
      
      <View style={styles.header}>
        <Text style={styles.title}>Hello.</Text>
        <Text style={styles.title}>Welcome Back</Text>
      </View>

      <View style={{flex: 1,marginRight: 20}}>
        <View style={{marginLeft: 30}}>
          <Text  style={{opacity: 0.3,}}>USERNAME</Text>
          <TextInput 
            style={styles.textInput}
            placeholder="email"
          />
        </View>
        
        <View style={{marginLeft: 30, marginTop: 40}}>
          <Text style={{paddingTop: 10, opacity: 0.3}}>PASSWORD</Text>

          <TextInput  
            style={styles.textInput}
            placeholder="password"
          />
          
          <TouchableOpacity>
            <Text style={{textAlign: "right", marginTop: 20, marginRight: 20, color: "gray"}}>Forgot Password?</Text>
          </TouchableOpacity>

        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity>
          <View style={{backgroundColor: "#2196F3", padding: 15, borderRadius: 10, margin: 20, marginTop: 40}}>
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
    paddingTop: 10
  }
});
