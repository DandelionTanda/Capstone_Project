import { useState }  from "react";
import * as React from 'react';
import { Button, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,View,Icon,Image } from "react-native";
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
    <View style={{ flex: 1,  width:'70%', alignSelf:'center' }}>
      <View style={{flexDirection: "row", marginTop:40,alignSelf:'center'}}>
      {localStorage.getItem('photo')!=='null'?
      <Image style={{ width: 100, height: 100, borderRadius: 100/ 2, marginBottom: 30 }} 
      source={{
          uri: localStorage.getItem('photo'),
       }} alt = "Avatar"></Image>:
       <MaterialCommunityIcons name="account-circle"  size={100}/>}
      <Text style={{ fontSize: 35, fontWeight: "bold", color: 'black',marginLeft:40,marginTop:30}}>{localStorage.getItem('name')}</Text>
      </View>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={clear}

      >
        <Ionicons name="log-out" size={35} color="white"/>
        <Text style={{fontSize: 20, fontWeight: "bold", color: 'white',marginLeft:70}}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    marginTop: 200,
    alignItems: "center",
    backgroundColor: "#E3310E",
    padding: 10,   
    flexDirection: 'row',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});