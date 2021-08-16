import { useState }  from "react";
import * as React from 'react';
import { Button, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,View,Icon,Image, ScrollView } from "react-native";
import 'react-native-gesture-handler';
import { NavigationContainer, getFocusedRouteNameFromRoute} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { get } from "react-native/Libraries/Utilities/PixelRatio";


export default function Discount( {route, navigation} ) {

  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <ScrollView style={{flex: 1}}>
      <View style={{width: 300, height:240, alignSelf:'center',marginTop:40, borderWidth: 2, marginBottom:20, backgroundColor:'#45B8DB', borderRadius: 100/2}}>
        <Text style={{fontSize: 110, color: 'white', alignSelf:'center'}}>
        {route.params.value}
        </Text>
        <Text style={{fontSize: 25,color: 'white', fontWeight:'bold', alignSelf:'center', marginTop: 30}}>
        {route.params.name} 
        </Text>
        
      </View>
      <View style= {styles.personalInfor}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.infor}>{user.name}</Text>
      </View>
      <View style= {styles.personalInfor}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.infor}>{user.email}</Text>
      </View>
      <View style= {styles.personalInfor}>
        <Text style={styles.label}>ID</Text>
        <Text style={styles.infor}>{user.id}</Text>
      </View>
      <View style= {styles.personalInfor}>
        <Text style={styles.label}>Organisation</Text>
        <Text style={styles.infor }>{user.organisation}</Text>
      </View>
    </ScrollView>
  );
  }
  
  const styles = StyleSheet.create({
     
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
  });