import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, PixelRatio} from 'react-native';
import {Button, Icon, Input} from "react-native-elements";
import { color } from 'react-native-elements/dist/helpers';
import MyButton from '../components/MyButton';
import {url} from '../networking/Api';
function Login({navigation}) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('') 
  
  async function DoLogin(){   
    
    try {
      const fetchResult = await fetch(`${url}/api/oauth/token`,{
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
        localStorage.setItem('partner_token', data.access_token)
        localStorage.setItem('partner_tokenType', data.token_type) 
        localStorage.setItem('org_token', data.access_token)
        localStorage.setItem('org_tokenType', data.token_type)
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
        {error ? <Text style={styles.error} testID='Error'>{error}</Text> : null}    
        <Input style={styles.email}
          placeholder='Email'
          placeholderTextColor="white"
          containerStyle={{width:screenWidth*0.9, color:"white"}}
          inputStyle={styles.inputText}
          label="Email"
          labelStyle={styles.inputText}
          value={email}
          onChangeText={value => setEmail(value)} 
        />
        <Input style={styles.password}
          placeholderTextColor="white"
          placeholder='Password'
          containerStyle={{width:screenWidth*0.9, color:"white"}}
          inputStyle={styles.inputText}
          label="Password"
          labelStyle={styles.inputText}
          value={password}
          onChangeText={value => setPassword(value)}
          secureTextEntry={true}
          renderErrorMessage={false}
          errorMessage=""
          errorStyle={{ color: 'red' }}
        />
        
      </View>     
      <MyButton onPress={DoLogin} title={'Login'} buttonStyle={styles.loginButton} textStyle={styles.buttonText}/> 
      
    </View>

  ); 
}
// Retrieve initial screen's width
let screenWidth = Dimensions.get('screen').width;

// Retrieve initial screen's height
let screenHeight = Dimensions.get('screen').height;
let styles;

if (screenWidth<350) {
  styles = StyleSheet.create(
    {  
      container: {
      flex: 1,
      backgroundColor: '#45B8DB',       
    },
  
    Text1:{
      marginTop: 20,
      fontWeight:"bold",
      color:"royalblue",
      left:screenWidth*0.68,
      fontSize:24,
      fontFamily:"Arial",
    },
  
    Text2:{      
      color:"white",
      marginTop: 16,
      marginLeft: screenWidth*0.1,
      fontSize: 35,
      fontFamily:"Arial",
      fontWeight: "bold"
    },
  
    Text3:{
      color:"white",
      marginTop: 16,
      marginLeft:screenWidth*0.2,
      textAlign:"center",
      fontSize: 35,
      fontFamily:"Arial",
      fontWeight: "bold"
    },
  
    main:{
      marginTop: 26,        
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
    inputText:{
      color:"white", 
      fontSize:16
    },
    loginButton:{
      alignItems: 'center',
      justifyContent: 'center',
      width: screenWidth*0.8,
      alignSelf:"center",
      paddingTop: 10,    
      paddingBottom: 10,         
      backgroundColor: 'white',   
      marginTop: 28 
    },
  
    buttonText:{
      fontSize:20,
      fontWeight:'bold',
      color:"#45B8DB"
    },
    error: {
      fontSize:18,
      marginBottom: 15,
      color:'red',
      justifyContent: 'center',
      textAlign:'center'
    }
  });
} else {
  styles = StyleSheet.create(
    {  
      container: {
      flex: 1,
      backgroundColor: '#45B8DB',       
    },
  
    Text1:{
      marginTop: 30,
      fontWeight:"bold",
      color:"royalblue",
      left:screenWidth*0.68,
      fontSize:28,
      fontFamily:"Arial",
    },
  
    Text2:{      
      color:"white",
      marginTop: 20,
      marginLeft: screenWidth*0.1,
      fontSize: 45,
      fontFamily:"Arial",
      fontWeight: "bold"
    },
  
    Text3:{
      color:"white",
      marginTop: 20,
      marginLeft:screenWidth*0.2,
      textAlign:"center",
      fontSize: 45,
      fontFamily:"Arial",
      fontWeight: "bold"
    },
  
    main:{
      marginTop: 75,        
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
    inputText:{
      color:"white", 
      fontSize:20
    },
    loginButton:{
      alignItems: 'center',
      justifyContent: 'center',
      width: screenWidth*0.8,
      alignSelf:"center",
      paddingTop: 10,    
      paddingBottom: 10,          
      backgroundColor: 'white',   
      marginTop: 55
    },
  
    buttonText:{
      fontSize:24,
      fontWeight:'bold',
      color:"#45B8DB"
    },
    error: {
      fontSize:20,
      marginBottom: 10,
      color:'red',
      justifyContent: 'center',
      textAlign:'center'
    }
  });
}

export default Login;