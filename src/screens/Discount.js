import { useState }  from "react";
import * as React from 'react';
import { Button, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,View,Icon,Image } from "react-native";
import 'react-native-gesture-handler';
import { NavigationContainer, getFocusedRouteNameFromRoute, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { get } from "react-native/Libraries/Utilities/PixelRatio";


export default function Discount( {route, navigation} ) {

  return ( 
    <View style={{ flex: 1, justifyContent: 'center',  alignSelf:'center'}}>
      <Text style={{fontSize: 30, fontWeight: "bold"}}>
        Name: {route.params.name}         
      </Text>
      <Text style={{fontSize: 30, fontWeight: "bold"}}> 
        Value: {route.params.value}
      </Text>
    </View>
  );
  }