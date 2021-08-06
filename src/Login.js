import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import {FloatingLabelInput} from "react-native-floating-label-input";
import AsyncStorage from "@react-native-async-storage/async-storage";


function Login({navigation}) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  function DoLogin(){
     
    fetch(`https://my.tanda.co/api/oauth/token`,{
     method: "POST",
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       username:username,
       password:password,
       scope:"me user device platform",
       grant_type:"password"
     })
   })
   .then(res=>res.json())
   .then(data=>{  
      try{     
        console.log(data) 
        if (data.error){
          setError(data.error)
        }   
        else {          
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('tokenType', data.token_type) 
        setError(false)      
        navigation.navigate("Discount") 
        }               
      }
      catch(err)
      {
        console.log(err)
        
      }
    })
    
   
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
      <Text style={styles.Text1}>TANDA</Text>
      <Text style={styles.Text2}>Discount</Text>
      <Text style={styles.Text3}>Discovery</Text>      
      </View >
      {error?
      <Text style={{fontSize: 20, fontWeight: "bold", color: 'red', textAlign: 'center'}}>
        username or password is incorrect
        </Text>:null}
        <View style={styles.footer}>          
        <Text></Text>
        <Text></Text>
        <View >         
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
        <View >
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
        <View>
        <Button title = "Login" onPress = {DoLogin}/>
        </View>
      </View>
    </View>
  ); 
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#45B8DB',   
  },
  header:{
    marginTop: 60,
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
    fontWeight: "bold"
  },
  Text2:{
    flex:1,
    position:"relative",
    color:"white",
    bottom:40,
    left:20,
    fontSize:50,
    fontFamily:"sans-serif",
    fontWeight: "bold"
  },
  Text3:{
    flex:1,
    position:"relative",
    color:"white",
    bottom:60,
    left:120,
    fontSize:50,
    fontFamily:"sans-serif",
    fontWeight: "bold"
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
