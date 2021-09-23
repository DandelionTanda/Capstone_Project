import { useState, useEffect }  from "react";
import * as React from 'react';
import { Button, FlatList, Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,View,Icon,Image, ScrollView } from "react-native";
import 'react-native-gesture-handler';
import { NavigationContainer, getFocusedRouteNameFromRoute, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function Me( { navigation } ) {
  
  function clear(){
    navigation.navigate('Login')
    localStorage.clear()
  }
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <ScrollView style={{ flex: 1}}>
      {/* View for image */}
      <View style={styles.image}>
      {localStorage.getItem('photo')!=='null'?
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
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={clear}
      >
        <Ionicons name="log-out" size={35} color="white"/>
        <Text style={{fontSize: 20, fontWeight: "bold", color: 'white'}}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Retrieve initial screen's width
let width = Dimensions.get('screen').width;

// Retrieve initial screen's height
let height = Dimensions.get('screen').height;

{/*Custom styles*/}
let styles;
if(width < height){
  //small screen
  if(width<350){
    styles = StyleSheet.create({
      logoutButton: {
        alignSelf:"center",
        marginTop: 24,
        alignItems: "center",
        backgroundColor: "#E3310E",
        padding: 10,   
        flexDirection: 'row',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
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
      },
    });
  }
  //large screen
  else{
    styles = StyleSheet.create({
      logoutButton: {
        alignSelf:"center",
        marginTop: 30,
        alignItems: "center",
        backgroundColor: "#E3310E",
        padding: 10,   
        flexDirection: 'row',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginBottom:40
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
      },
    });
  }
}