import { useState, useEffect }  from "react";
import * as React from 'react';
import { ActivityIndicator,  Dimensions, SafeAreaView, StyleSheet, Text, View,Icon,Image, ScrollView } from "react-native";
import { useScrollToTop, useIsFocused } from '@react-navigation/native';
import { fetchUser } from '../networking/Api'
import MyButton from '../components/MyButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Me( { navigation } ) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('') 
  const isFocused = useIsFocused()
  function clear(){
    navigation.navigate('Login')
    localStorage.clear()
  }
  
  useEffect(async () => {  

    if (isFocused) {     
      let user = await fetchUser()    
      if (user instanceof Error) {
        setError(user.message)     
      }
      else {    
        await setUser(user)  
      } 
      await setLoading(false) 
    }
        
  },[isFocused])
  const onRefresh = React.useCallback(async () => {
    await setLoading(true);
    let user = await fetchUser()   
    if (user instanceof Error) {
      setError(user.message)
    }
    else {
      setError("")
      await setUser(user)  
    }
    await setLoading(false)
  }, []);  
  
  if (loading !== true){  
    if (error) {    
      return (
        <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center',
        flexDirection: 'column',}}>
          <Text style={styles.error}>{error}</Text>
          <MyButton onPress={onRefresh} title={'Refresh'} buttonStyle={styles.refreshButton} textStyle={styles.buttonText}/>
        </View>
      ) 
    } else {
      return (
        <ScrollView style={{ flex: 1}}>
          {/* View for image */}
          <View style={styles.image}>
          {user.photo!==null?
          <Image style={{ width: 150, height: 150, borderRadius: 130/2 }} 
          source={{
              uri: user.photo,
          }} alt = "Avatar"></Image>:
          <MaterialCommunityIcons name="account-circle"  size={100}/>}
          </View>
          {/* View for information: Name, Email, ID, Role, Company*/}
          <View style= {styles.personalInfor}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.infor}>{user.name}</Text>
          </View>
          <View style= {styles.personalInfor}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.infor}>{user.email}</Text>
          </View>
          <View style= {styles.personalInfor}>
            <Text style={styles.label}>Company</Text>
            <Text style={styles.infor}>{user.organisation}</Text>
          </View>
          <View style= {styles.personalInfor}>
            <Text style={styles.label}>Employee ID</Text>
            <Text style={styles.infor}>{user.id}</Text>
          </View>
          {/* logout button */}
          <MyButton onPress={clear} title={'Log out'} buttonStyle={styles.logoutButton} textStyle={styles.buttonText}/>
          
        </ScrollView>
      )
    }
  } 
  else {
      return (
        <View style={[styles.container, styles.horizontal]}>      
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
        )
  }
    
}

// Retrieve initial screen's width
let width = Dimensions.get('screen').width;

// Retrieve initial screen's height
let height = Dimensions.get('screen').height;

{/*Custom styles*/}
let styles;

//small screen
if(width<350){
  styles = StyleSheet.create({
    container: {
      flex: 1,    
      backgroundColor: '#F5F3F3',
      marginTop: 24,
      marginLeft: 24,
      marginRight: 24,
      marginBottom: 24
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    },
    logoutButton: {
      alignSelf:"center",   
      alignItems: "center",
      justifyContent: 'center',
      backgroundColor: "#E3310E",
      padding: 10,   
      flexDirection: 'row',
      width: '50%',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      marginTop: 28,
      marginBottom:28
    },
    
    personalInfor:{
      marginLeft:30,
      marginRight:30,
      borderBottomColor: 'black',
      borderBottomWidth: 1
    },
    label:{
      marginTop:10,
      fontSize: 20,
      fontWeight: "bold",
      color: '#1D87E3'
    },
    infor:{
      fontSize: 16,
      color: '#232A22',
      lineHeight: 32
    },
    image:{
      flexDirection: "row",
      marginTop:28 ,
      alignSelf:'center',
    },error: {
      fontSize:20,
      alignItems: "center",
      justifyContent: 'center',
      color:'red',
    },
    refreshButton:{
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft:20,
      marginRight:20,
      paddingVertical: 16,
      borderRadius: 4,  
      backgroundColor: '#45B8DB',
      position:"relative",
      top:20,
      width: '40%'
    },
    buttonText:{
      fontSize: 18, 
      fontWeight: "bold", 
      color: 'white',
      marginLeft:10
    }
  });
}
//large screen
else{
  styles = StyleSheet.create({
    container: {
      flex: 1,    
      backgroundColor: '#F5F3F3',
      marginTop: 24,
      marginLeft: 24,
      marginRight: 24,
      marginBottom: 24
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    },
    logoutButton: {
      alignSelf:"center",
      justifyContent: 'center',
      marginTop: 30,
      alignItems: "center",
      backgroundColor: "#E3310E",
      padding: 10,   
      flexDirection: 'row',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      marginBottom:40,
      width: '50%'
    },
    personalInfor:{
      marginLeft:30,
      marginRight:30,
      borderBottomColor: 'black',
      borderBottomWidth: 1
    },
    label:{
      marginTop:10,
      fontSize: 22,
      fontWeight: "bold",
      color: '#1D87E3'
    },
    infor:{
      fontSize: 18,
      color: '#232A22',
      lineHeight: 40
    },
    image:{
      flexDirection: "row",
      marginTop:40 ,
      alignSelf:'center',
    },error: {
      fontSize:20,
      alignItems: "center",
      justifyContent: 'center',
      color:'red',
    },
    refreshButton:{
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft:20,
      marginRight:20,
      paddingVertical: 16,
      borderRadius: 4,  
      backgroundColor: '#45B8DB',
      position:"relative",
      top:20,
      width: '40%'
    },
    buttonText:{
      fontSize: 20, 
      fontWeight: "bold", 
      color: 'white',
      marginLeft:10
    }
  });
}
