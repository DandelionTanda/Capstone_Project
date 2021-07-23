import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Input } from 'react-native';
import {FloatingLabelInput} from "react-native-floating-label-input";


export default function Login( {navigation} ) {


  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  

  return (
    
    <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.header}>
        <Text style={styles.Text1}>TANDA</Text>
        <Text style={styles.Text2}>Discount</Text>
        <Text style={styles.Text3}>Discovery</Text>
        </View>
          <View style={styles.footer}>
          <Text></Text>
          <Text></Text>
          <View style={styles.username}>         
            <FloatingLabelInput 
            label= "Username"
            value={username}
            containerStyles={{
            borderWidth:2,
            borderColor:"white",
            borderRadius: 10,
            width:40,
            height:40,
            }}
            onChangeText={value => setUsername(value)}
          /></View>
          <Text></Text>
          <Text></Text>
          <View style={styles.password}>
          <FloatingLabelInput
            label="Password"
            isPassword={true}
            value={password}
            containerStyles={{
            borderWidth:2,
            borderColor:"white",
            borderRadius: 10,
            width:40,
            height:40,
            }}
            onChangeText={value => setPassword(value)}
          />
          </View>
          <Text></Text>
          <Text></Text>
          <View style={styles.button}>
          <Button title = "Login" onPress = {() => navigation.navigate('Discount')}/>
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
    left:280,
    fontSize:30,
    fontFamily:"sans-serif",
  },
  Text2:{
    flex:1,
    position:"relative",
    color:"white",
    bottom:40,
    left:20,
    fontSize:50,
    fontFamily:"sans-serif",
  },
  Text3:{
    flex:1,
    position:"relative",
    color:"white",
    bottom:60,
    left:120,
    fontSize:50,
    fontFamily:"sans-serif",
  },
  footer:{
    flex:1,
    color:"white",
  },
  username:{
    padding:10,
    position:"relative",
    bottom:60,
  },
  password:{
    padding:10,
    position:"relative",
    bottom:60,
  },
  button:{
    padding:15,
    position:"relative",
    bottom:60,
  }
});
