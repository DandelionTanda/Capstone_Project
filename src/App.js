import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Discount from './Discount';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{
    headerShown: false 
  }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Discount" component={Discount} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;



