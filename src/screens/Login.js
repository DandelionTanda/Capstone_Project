import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, PixelRatio} from 'react-native';
import {Button, Icon, Input} from "react-native-elements";
import { color } from 'react-native-elements/dist/helpers';

// Retrieve initial screen's width
let screenWidth = Dimensions.get('screen').width;

// Retrieve initial screen's height
let screenHeight = Dimensions.get('screen').height;

function fontSizer(screenHeight){
  if(screenHeight > 550){
    return 40;
  }else { 
    return 35;
  }

};

function textSizer(screenWidth,screenHeight){
  if(screenHeight < 550)
  {
    return screenWidth*0.1
  }
  else{
    return screenWidth*0.15
  }
}



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
          navigation.navigate("HomeTabs") 
        }               
      }
      catch(err)
      {
        console.log(err)     
      }
    })
  }

  console.log(screenHeight)
  console.log(screenWidth)
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
          containerStyle={{width:screenWidth, color:"white"}}
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
          containerStyle={{width:screenWidth, color:"white"}}
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
    backgroundColor: '#45B8DB',  
    paddingBottom:screenHeight, 
  },

  Text1:{
    marginTop: textSizer(screenWidth,screenHeight),
    fontWeight:"bold",
    color:"royalblue",
    left:screenWidth*0.68,
    fontSize:27,
    fontFamily:"Arial",
  },

  Text2:{
    
    color:"white",
    marginTop: textSizer(screenWidth,screenHeight),
    marginLeft: screenWidth*0.1,
    fontSize:fontSizer(screenHeight),
    fontFamily:"Arial",
    fontWeight: "bold"
  },

  Text3:{
    color:"white",
    marginTop: textSizer(screenWidth,screenHeight),
    marginLeft:screenWidth*0.2,
    textAlign:"center",
    fontSize: fontSizer(screenHeight),
    fontFamily:"Arial",
    fontWeight: "bold"
  },

  main:{
    marginTop:screenHeight*0.04,
    marginLeft: screenWidth*0.1,
    marginRight: screenWidth*0.1,
    height:screenHeight*0.1,
    alignItems:'center',
  },

  username:{
    borderBottomColor:'white',
    borderBottomWidth: 1.5 
  },

  password:{
    marginTop:-5,
    borderBottomColor:'white',
    borderBottomWidth: 1.5 
  },

  button:{
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:screenWidth*0.2,
    marginRight:screenWidth*0.2,
    paddingVertical: 15,
    borderRadius: 4,  
    backgroundColor: 'white',
    position:"relative",
    top:screenWidth*0.45,
  },

  text:{
    fontSize:24,
    fontWeight:'bold',
    color:"#45B8DB"
  }

});
