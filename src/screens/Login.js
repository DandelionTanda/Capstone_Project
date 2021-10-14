import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, PixelRatio} from 'react-native';
import {Button, Icon, Input} from "react-native-elements";
import { color } from 'react-native-elements/dist/helpers';
import MyButton from '../components/MyButton';

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

function buttonSizer(screenWidth,screenHeight){
  if(screenWidth < 350 || screenHeight <550)
  {
    return screenWidth*0.3
  }
  else{
    return screenWidth*0.2
  }
}


function buttonPadding(screenWidth, screenHeight){
  if(screenWidth < 350 || screenHeight <550)
  {
    return 5
  }
  else{
    return 15
  }
}

function buttonTop(screenWidth, screenHeight){
  if(screenWidth < 350 || screenHeight <550)
  {
    return screenWidth*0.48
  }
  else{
    return screenWidth*0.45
  }
}

function Login({navigation}) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('') 
  
  async function DoLogin(){   
    
    try {
      const fetchResult = await fetch(`https://internal-allow-partner-organisation-to-be-switched-to.ms.tanda.co/api/oauth/token`,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username:"zouweiran9122@gmail.com",
          //username:"leo727268082@gmail.com",
          password:"123456789",
          scope:"me user device platform organisation",
          grant_type:"password"
        })
      })        
      
      if (!fetchResult.ok) {         
        if (fetchResult.status === 400) {               
          const errorMessage = "Invalid email or password";
          throw Error(errorMessage)        
        }
        else {
          const errorMessage = `An error has occured: ${fetchResult.status}`;   
          throw Error(errorMessage)         
        }                  
      }  
      else {
        setError("")
        const data = await fetchResult.json() 
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('tokenType', data.token_type) 
        navigation.navigate("HomeTabs") 
      }
    } catch (err) {      
      
      setError(err.message)
    }   
  };   

  return (
    <View style={styles.container}>    
      <View style={styles.header}>
      <Text style={styles.Text1}>TANDA</Text>
      <Text style={styles.Text2}>Discount</Text>
      <Text style={styles.Text3}>Discovery</Text>      
      </View>
      <View style={styles.main}>
        <Input style={styles.email}
          placeholder='Email'
          placeholderTextColor="white"
          containerStyle={{width:screenWidth, color:"white"}}
          inputStyle={{color:"white", fontSize:16}}
          label="Email"
          labelStyle={{color:"white"}}
          value={email}
          onChangeText={value => setEmail(value)} 
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
        {error ? <Text style={styles.error} testID='Error'>{error}</Text> : null}
      </View>     
      <MyButton onPress={DoLogin} title={'Login'} buttonStyle={styles.loginButton} textStyle={styles.buttonText}/> 
      
    </View>

  ); 
}

export default Login;

const styles = StyleSheet.create(
  {
  
  container: {
    flex: 1,
    backgroundColor: '#45B8DB',  
    
  },

  Text1:{
    marginTop: textSizer(screenWidth,screenHeight),
    fontWeight:"bold",
    color:"royalblue",
    left:screenWidth*0.68,
    fontSize:27,
    fontFamily:"FredokaOne-Regular",
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
    marginLeft: screenWidth*0.12,
    marginRight: screenWidth*0.1,
    height:screenHeight*0.1,
    alignItems:'center',
   
  },

  email:{
    borderBottomColor:'white',
    borderBottomWidth: 1.5 
  },

  password:{
    marginTop:-5,
    borderBottomColor:'white',
    borderBottomWidth: 1.5 
  },

  loginButton:{
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:buttonSizer(screenWidth,screenHeight),
    marginRight:buttonSizer(screenWidth,screenHeight),
    paddingVertical: buttonPadding(screenWidth, screenHeight),
    borderRadius: 4,  
    backgroundColor: 'white',
    position:"relative",
    top:buttonTop(screenWidth, screenHeight),
  },

  buttonText:{
    fontSize:24,
    fontWeight:'bold',
    color:"#45B8DB"
  },
  error: {
    fontSize:20,
    marginTop: 10,
    color:'red',
  }
});
