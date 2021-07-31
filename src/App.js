import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from './Login';
import Discount from './Discount';
import { Button, View } from 'react-native';
import 'localstorage-polyfill';

const Stack = createStackNavigator();
const auth = createStackNavigator();

function App() {
  

  return (
    
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Discount" component={Discount} /> 
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;



