import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SignUpHeader(){
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Create Account.</Text>
      <Text style={[styles.title], { fontSize: 25, color: "gray" }}>Sign up to get started</Text>
    </View>
  )
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
})