import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, PixelRatio} from 'react-native';
import {Button, Icon, Input} from "react-native-elements";
import { color } from 'react-native-elements/dist/helpers';

// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;

// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;

function fontSizer(screenWidth){
  if(screenWidth > 250){
    return 40;
  }else { 
    return 35;
  }
};




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
       username:"leo727268082@gmail.com",
       password:"123456789",
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
          navigation.navigate("Home") 
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

      {/* <StatusBar style="auto" /> */}
      <View style={styles.header}>
      <Text style={styles.Text1}>TANDA</Text>
      <Text style={styles.Text2}>Discount</Text>
      <Text style={styles.Text3}>Discovery</Text>      
      </View>
      <View style={styles.main}>
        <Input style={styles.username}
          placeholder='Username'
          placeholderTextColor="white"
          containerStyle={{width:350, color:"white"}}
          inputStyle={{color:"white", fontSize:16}}
          label="Username"
          labelStyle={{color:"white"}}
          value={username}
          onChangeText={value => setUsername(value)} 
        />

        <Text></Text>

        <Input style={styles.password}
          placeholderTextColor="white"
          placeholder='Password'
          containerStyle={{width:350, color:"white"}}
          inputStyle={{color:'white', fontSize:16}}
          label="Password"
          labelStyle={{color:"white"}}
          value={password}
          onChangeText={value => setPassword(value)}
          secureTextEntry={true}
          renderErrorMessage={false}
          errorMessage=""
          errorStyle={{ color: 'red' }}
        />

      </View>

      <View >
        <Pressable style={styles.button} onPress={DoLogin}>
          <Text style={styles.text}>Login</Text>
        </Pressable>
      </View>
      
    </View>

  ); 
}

export default Login;

const styles = StyleSheet.create(
  {
  
  container: {
    // flex:1,
    backgroundColor: '#45B8DB',  
    paddingBottom:screenHeight, 
  },

  Text1:{
    marginTop: screenHeight*0.12,
    fontWeight:"bold",
    color:"royalblue",
    left:screenWidth*0.68,
    fontSize:27,
    fontFamily:"FredokaOne-Regular",
  },

  Text2:{
    
    color:"white",
    top:screenHeight*0.1,
    left:screenWidth*0.1,
    fontSize:fontSizer(screenWidth),
    fontFamily:"FredokaOne-Regular",
    fontWeight: "bold"
  },

  Text3:{
    color:"white",
    top:screenHeight*0.15,
    left:screenWidth*0.35,
    fontSize:fontSizer(screenWidth),
    fontFamily:"Arial",
    fontWeight: "bold"
  },

  main:{
    marginTop:220,
    width:screenHeight*0.45,
    height:screenHeight*0.18,
    alignItems:'center',
  },

  username:{
    borderBottomColor:'white',
    borderBottomWidth: 1.5 
  },

  password:{
    borderBottomColor:'white',
    borderBottomWidth: 1.5 
  },

  button:{
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:60,
    marginRight:60,
    paddingVertical: 15,
    borderRadius: 4,  
    backgroundColor: 'white',
    position:"relative",
    top:screenWidth*0.2,
  },

  text:{
    fontSize:24,
    fontWeight:'bold',
    color:"#45B8DB"
  }

});
