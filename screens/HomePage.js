import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import Firebase from "../database/firebase";

export default function App() {

  function handleLogOut() {
    Firebase.auth().signOut();
  }


  return (
    <View style={styles.container}>
      <Text>Home Page screen </Text>
      <Button 
        title="Log out"
        onPress={handleLogOut}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
