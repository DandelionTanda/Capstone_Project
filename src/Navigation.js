import { useState }  from "react";
import * as React from 'react';
import { Button, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,View,Icon,Image } from "react-native";
import 'react-native-gesture-handler';
import { NavigationContainer, getFocusedRouteNameFromRoute, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Home from "./screens/Home";
import Me from "./screens/Me";
import Discount from "./screens/Discount";
import Login from "./screens/Login";


function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'Me':
      return 'Me';   
  }
}

const Tab = createBottomTabNavigator();

function MyTabs({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#45B8DB',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Me"
        component={Me}
        options={{
          tabBarLabel: 'Me',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}


const Stack = createStackNavigator();

export default function MyStack() {
  
  fetch(`https://my.tanda.co/api/v2/users/me`,{
      method: "GET",
      headers: {Authorization: localStorage.getItem('tokenType')+ ' ' +localStorage.getItem('token')}})
  .then(res=>res.json())
  .then((res)=>{
  try{    
      console.log(res)
      localStorage.setItem('id', res.id)
      localStorage.setItem('organisation', res.organisation)
      localStorage.setItem('name', res.name)
      localStorage.setItem('photo', res.photo)     
  }
  catch(err)
  {
      console.log("err")
  }
  })

  return (  
    <Stack.Navigator initialRouteName="Home" >
      <Stack.Screen 
        name="Home" 
        component={MyTabs} 
        options={{ 
        tabBarLabel: 'Home!' ,
        headerStyle: {
          backgroundColor: '#45B8DB',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        headerLeft: null
      }}/>
      <Stack.Screen 
        name="Discount Details" 
        component={Discount} 
        options={{           
        headerStyle: {
          backgroundColor: '#45B8DB',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center'
      }}/>
    </Stack.Navigator>     
    
  );
}

