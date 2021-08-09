import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from './screens/Login';
import RootNavigator from './Navigation';
import { Button, View } from 'react-native';
import MyStack from './Navigation';
import 'localstorage-polyfill';

const RootStack = createStackNavigator();

function App() {
  return (    
    <NavigationContainer>
        <RootStack.Navigator initialRouteName="Login" screenOptions={{headerShown: false }}>
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="MyStack" component={MyStack} /> 
        </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;



