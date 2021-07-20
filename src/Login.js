import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, state, Input } from 'react-native';
import {FloatingLabelInput} from "react-native-floating-label-input";


export default function Login( {navigation} ) {

  const [Username, setUsername] = useState("")
  const [Password, setPassword] = useState("")


  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.Text1}>TANDA</Text>
        <Text style={styles.Text2}>Discount</Text>
        <Text style={styles.Text3}>Discovery</Text>
        </View>
        <View style={styles.footer}>
        <Text></Text>
        <Text></Text>
        <FloatingLabelInput style={styles.Username}
        label="Username"
        value={Username}
        />
        <Text></Text>
        <Text></Text>
       <FloatingLabelInput
       label="Password"
       isPassword={true}
       value={Password}
        />
        <Text></Text>
        <Text></Text>
        <StatusBar style="auto" />
        <View style={styles.button}>
        <Button title = "Log in" onPress = {() => navigation.navigate("Discount")} />
        </View>
        </View>
    </View>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#45B8DB',   
  },
  header:{
    flex:1,
  },
  Text1:{
    flex:1,
    position:"relative",
    fontWeight:"bold",
    color:"royalblue",
    top:80,
    left:250,
    fontSize:30,
    fontFamily:"sans-serif",
  },
  Text2:{
    flex:1,
    position:"relative",
    color:"white",
    top:80,
    left:20,
    fontSize:50,
    fontFamily:"sans-serif",
  },
  Text3:{
    flex:1,
    position:"relative",
    color:"white",
    top:40,
    left:120,
    fontSize:50,
    fontFamily:"sans-serif",
  },
  footer:{
    flex:1,
    position:"relative",
    color:"white",
    top:40,


  },
  button:{
    width:400,
    height:100,
  }
});
