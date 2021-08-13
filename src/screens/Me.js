import { useState }  from "react";
import * as React from 'react';
import { Button, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,View,Icon,Image, ScrollView } from "react-native";
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
  
  return (
    <ScrollView style={{ flex: 1, alignSelf:'center' }}>
      {/* View for image */}
      <View style={{flexDirection: "row", marginTop:20,alignSelf:'center'}}>
      {localStorage.getItem('photo')!=='null'?
      <Image style={{ width: 150, height: 150, borderRadius: 130/2 }} 
      source={{
          uri: localStorage.getItem('photo'),
       }} alt = "Avatar"></Image>:
       <MaterialCommunityIcons name="account-circle"  size={100}/>}
      </View>
      {/* View for information: Name, Email, ID, Role, Company*/}
      <View style= {{alignSelf : 'auto', marginTop: 30}}>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.infor}>{localStorage.getItem('name')}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.infor}>{localStorage.getItem('email')}</Text>
      <Text style={styles.label}>Company:</Text>
      <Text style={styles.infor}>{localStorage.getItem('name')}</Text>
      <Text style={styles.label}>Role:</Text>
      <Text style={styles.infor}>{localStorage.getItem('permissions')}</Text>
      <Text style={styles.label}>ID:</Text>
      <Text style={styles.infor}>{localStorage.getItem('id')}</Text>
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

const styles = StyleSheet.create({
  logoutButton: {
    alignSelf:"center",
    marginTop: 50,
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
  label:{
    marginLeft:24,
    marginTop:10,
    fontSize: 30,
    fontWeight: "bold",
    color: 'black'
  },
  infor:{
    marginLeft:50,
    marginRight:30,
    fontSize: 22,
    color: '#232A22'
  },
});