import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Alert } from 'react-native';
import { Feather } from "@expo/vector-icons";

import Firebase from "../database/firebase";

const Profile = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const [modalVisible, setModalVisible] = useState(false);
  
    function handleLogOut() {
    Firebase.fire.auth().signOut();
  }

  const updateUser = async () => {
    const userRef = Firebase.db.collection("users").doc(Firebase.fire.auth().currentUser.uid);
    await userRef.set({
      name: name,
      password: password,
      age: age,
      email: email,
    });
    setModalVisible(!modalVisible);
  };

  const getUserDetails = async () => {
    try {
        await Firebase.db.collection('users').doc(Firebase.fire.auth().currentUser.uid)
              .get()
              .then(snapshot => {
                const userData = snapshot.data();
                setAge(userData.age);
                setName(userData.name);
                setPassword(userData.password);
                setEmail(userData.email);
            })
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() =>{
    getUserDetails();
  }, [])

  function handleTextChangeEmail(value) {
   setEmail(value);   
  }

  function handleTextChangePassword(value) {
    setPassword(value);   
   }

   function handleTextChangeName(value) {
    setName(value);   
   }

   function handleTextChangeAge(value) {
    setAge(value);   
   }

  return (
    <View style={{flex: 1,backgroundColor: '#fff',}}>

        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
        >

            <View style={styles.header}>
                <Text style={styles.title}>Changement</Text>
            </View>

            <View style={{flex: 1,marginRight: 20, marginLeft:30, marginTop: 0}}>
                <View style={styles.profilePicture}>

                </View>

                <View>
                    <Text  style={{opacity: 0.3,}}>EMAIL</Text>
                    <TextInput 
                        style={{borderBottomColor: "gray",borderBottomWidth: 1,paddingTop: 10,}}
                        onChangeText={handleTextChangeEmail}
                        value={email == null ? "Undefined" : email}
                    /> 
                </View>

                <View style={{marginTop: 30}}>
                    <Text  style={{opacity: 0.3,}}>PASSWORD</Text>
                    <TextInput 
                        style={{borderBottomColor: "gray",borderBottomWidth: 1,paddingTop: 10,}}
                        onChangeText={handleTextChangePassword}
                        value={password == null ? "Undefined" : password}
                    /> 
                </View>

                <View style={{marginTop: 30}}>
                    <Text  style={{opacity: 0.3,}}>NAME</Text>
                    <TextInput 
                        style={{borderBottomColor: "gray",borderBottomWidth: 1,paddingTop: 10,}}
                        onChangeText={handleTextChangeName}
                        value={name == null ? "Undefined" : name}
                    /> 
                </View>

                <View style={{marginTop: 30}}>
                    <Text  style={{opacity: 0.3,}}>AGE</Text>
                    <TextInput 
                        style={{borderBottomColor: "gray",borderBottomWidth: 1,paddingTop: 10,}}
                        onChangeText={handleTextChangeAge}
                        value={age == null ? "Undefined" : age}
                    /> 
                </View>
            </View>

            <View style={{flex: 0.5, flexDirection: 'row' ,justifyContent: 'center', alignItems: "center"}}>

                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>
                    <View style={{backgroundColor: "#292727", padding: 15,borderRadius: 10,margin: 20}}>
                        <Text style={{ textAlign: "center", color: "white" }}>Cancel</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => updateUser()}>
                    <View style={{backgroundColor: "#292727", padding: 15,borderRadius: 10,margin: 20, paddingHorizontal: 20}}>
                        <Text style={{ textAlign: "center", color: "white" }}>Save</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </Modal>


        <View style={styles.header}>
            <Text style={styles.title}>My Profile</Text>
        </View>

        <View style={{flex: 1,marginRight: 20}}>
            <View style={styles.profilePicture}>

            </View>

            <View style={{marginLeft: 30}}>
                <Text  style={{opacity: 0.3,}}>EMAIL</Text>
                <Text style={{borderBottomColor: "gray",borderBottomWidth: 1,paddingTop: 10,}}>{email == null ? "Undefined" : email}</Text> 
            </View>

            <View style={{marginLeft: 30, marginTop: 30}}>
                <Text  style={{opacity: 0.3,}}>PASSWORD</Text>
                <Text style={{borderBottomColor: "gray",borderBottomWidth: 1,paddingTop: 10,}}>{password == null ? "Undefined" : password}</Text> 
            </View>

            <View style={{marginLeft: 30, marginTop: 30}}>
                <Text  style={{opacity: 0.3,}}>NAME</Text>
                <Text style={{borderBottomColor: "gray",borderBottomWidth: 1,paddingTop: 10,}}>{name == null ? "Undefined" : name}</Text> 
            </View>

            <View style={{marginLeft: 30, marginTop: 30}}>
                <Text  style={{opacity: 0.3,}}>AGE</Text>
                <Text style={{borderBottomColor: "gray",borderBottomWidth: 1,paddingTop: 10,}}>{age == null ? "Undefined" : age}</Text> 
            </View>
        </View>

        <View style={styles.footer}>
            <View style={{flexDirection: "row", marginBottom: 0}}>
                <TouchableOpacity onPress={() => {setModalVisible(true)}}>
                    <View style={styles.circle}>
                        <Feather 
                            name="edit-2"
                            size={20}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.circle}>
                        <Feather 
                            name="dollar-sign"
                            size={20}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogOut}>
                    <View style={styles.circle}>
                        <Feather 
                            name="log-out"
                            size={20}
                        />
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    paddingTop: 40,
    paddingBottom: 40,
    marginLeft: 30,
  },
    title:{
    fontSize: 30,
    fontWeight: "bold"
  },
  textInput:{
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    paddingTop: 10,
    flex: 1
  },
  footer:{
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center'
  },
  circle:{
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: "gray",
    marginLeft: 30
  },
  profilePicture:{
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "gray",
    alignSelf:"center",
    marginBottom: 40,
  }
});

export default Profile;