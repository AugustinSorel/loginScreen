import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Alert } from 'react-native';
import { Feather } from "@expo/vector-icons";

import Firebase from "../database/firebase";

export default function Profile() {

    const [modalVisible, setModalVisible] = useState(false);
  
    function handleLogOut() {
    Firebase.auth().signOut();
  }

  return (
    <View style={{flex: 1,backgroundColor: '#fff',}}>

        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
        >
            <View style={{flex: 1,marginRight: 20}}>
                <View style={styles.profilePicture}>

                </View>

                <View style={{marginLeft: 30}}>
                    <Text  style={{opacity: 0.3,}}>EMAIL</Text>
                    <Text style={{borderBottomColor: "gray",borderBottomWidth: 1,paddingTop: 10,}}>deded</Text> 
                </View>

                <View style={{marginLeft: 30, marginTop: 30}}>
                    <Text  style={{opacity: 0.3,}}>PASSWORD</Text>
                    <Text style={{borderBottomColor: "gray",borderBottomWidth: 1,paddingTop: 10,}}>*********</Text> 
                </View>

                <View style={{marginLeft: 30, marginTop: 30}}>
                    <Text  style={{opacity: 0.3,}}>NAME</Text>
                    <Text style={{borderBottomColor: "gray",borderBottomWidth: 1,paddingTop: 10,}}>dd</Text> 
                </View>

                <View style={{marginLeft: 30, marginTop: 30}}>
                    <Text  style={{opacity: 0.3,}}>AGE</Text>
                    <Text style={{borderBottomColor: "gray",borderBottomWidth: 1,paddingTop: 10,}}>20</Text> 
                </View>

                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>
                    <Text>Hide Modal</Text>
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
                <Text style={{borderBottomColor: "gray",borderBottomWidth: 1,paddingTop: 10,}}>deded</Text> 
            </View>

            <View style={{marginLeft: 30, marginTop: 30}}>
                <Text  style={{opacity: 0.3,}}>PASSWORD</Text>
                <Text style={{borderBottomColor: "gray",borderBottomWidth: 1,paddingTop: 10,}}>*********</Text> 
            </View>

            <View style={{marginLeft: 30, marginTop: 30}}>
                <Text  style={{opacity: 0.3,}}>NAME</Text>
                <Text style={{borderBottomColor: "gray",borderBottomWidth: 1,paddingTop: 10,}}>dd</Text> 
            </View>

            <View style={{marginLeft: 30, marginTop: 30}}>
                <Text  style={{opacity: 0.3,}}>AGE</Text>
                <Text style={{borderBottomColor: "gray",borderBottomWidth: 1,paddingTop: 10,}}>20</Text> 
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
