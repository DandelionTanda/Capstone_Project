import { useState }  from "react";
import * as React from 'react';
import { Button, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,View,Icon,Image, ScrollView } from "react-native";
import 'react-native-gesture-handler';
import { NavigationContainer, getFocusedRouteNameFromRoute, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { get } from "react-native/Libraries/Utilities/PixelRatio";


export default function Discount( {route, navigation} ) {

  return (
    <ScrollView style={{flex: 1,  alignSelf:'center'}}>
      <View style={{width: 250, height:250, alignSelf:'center',marginTop:20, borderWidth: 2, marginBottom:20, backgroundColor:'#45B8DB', borderRadius: 100/2}}>
        <Text style={{fontSize: 120, color: 'white', alignSelf:'center'}}>
        {route.params.value}
        </Text>
        <Text style={{fontSize: 30,color: 'white', fontWeight:'bold', alignSelf:'center'}}>
        {route.params.name} 
        </Text>
        <Text style={{fontSize: 24,color: 'white',fontWeight:'bold', alignSelf:'center'}}>
          {route.params.shift} Discount
        </Text>
      </View>
      <Text style={styles.label}>Username:</Text>
      <Text style={styles.infor}>{localStorage.getItem('name')}</Text>
      <Text style={styles.label}>ID:</Text>
      <Text style={styles.infor}>{route.params.id}</Text>
      <Text style={styles.label}>Organisation:</Text>
      <Text style={styles.infor }>{localStorage.getItem('organisation')}</Text>
    </ScrollView>
  );
  }
  
  const styles = StyleSheet.create({
    label:{
      marginLeft:20,
      fontSize: 30,
      fontWeight: "bold",
      color: '#1D87E3'
    },
    infor:{
      marginBottom:20,
      marginLeft:50,
      marginRight:30,
      fontSize: 22,
      fontWeight: "bold",
      color: '#232A22'
    },
  });