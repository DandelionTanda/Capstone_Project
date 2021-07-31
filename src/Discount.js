import { useState }  from "react";
import * as React from 'react';
import { Button, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,View,Icon,Image } from "react-native";
import 'react-native-gesture-handler';
import { NavigationContainer, getFocusedRouteNameFromRoute, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const Home = ( {navigation} ) => {
  const DATA = [
    {    
      name: "On-shift discount",
      value: "30%",
    },
    {   
      name: "On-shift discount",
      value: "40%",
    },
    {   
      name: "On-shift discount",
      value: "50%",
    },
    {    
      name: "On-shift discount",
      value: "60%",
    },
    {   
      name: "On-shift discount",
      value: "70%",
    },
    {   
      name: "On-shift discount",
      value: "80%",
    },
  ];
  
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Discount Details', item)} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.name} {item.value} </Text>
    </TouchableOpacity>
  );
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item, index }) => {
    const backgroundColor = index === selectedId ? '#45B8DB' : '#45B8DB';
    const color = index === selectedId ? 'white' : 'white';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(index)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
        
      <View style={styles.clock}>
          <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
              Clocked In
          </Text>
      </View>                 
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}        
        extraData={selectedId}
        style={{marginVertical: 25,}}
      />    
    </SafeAreaView>
    
  );
};

function Me( { navigation } ) {

  //get token
  const token =  localStorage.getItem('token')
  //get type of token
  const tokenType =  localStorage.getItem('tokenType')
  //data header
  const config = {
    method: "GET",
    headers: {Authorization: localStorage.getItem('tokenType')+ ' ' +localStorage.getItem('token')}};
  const [userName, setUserName] = useState('')
  const [photo, setPhoto] = useState('')
  function clear(){
    navigation.navigate('Login')
    AsyncStorage.clear()
    localStorage.clear()
  }
  const url = `https://my.tanda.co/api/v2/users/me`
  fetch(url,config)
  .then(res=>res.json())
   .then((res)=>{
    try{
      setUserName(res.name)
      setPhoto(res.photo)
    }
    catch(err)
    {
      console.log("err")
    }
   });
  
  return (
    <View style={{ flex: 1, justifyContent: 'center',  width:'50%', alignSelf:'center' }}>
      <Image style={{ width: '100%', height: '40%', justifyContent: 'center',alignItems: 'center', marginBottom: 30 }} 
      source={{
          uri: photo,
       }} alt = "Avatar"></Image>
      <Text style={{fontSize: 35, fontWeight: "bold", color: 'black',marginLeft:40,marginBottom:40}}>Welcome {userName}</Text>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={clear}
      >
        <Ionicons name="log-out" size={35} color="white" />     
        <Text style={{fontSize: 20, fontWeight: "bold", color: 'white',marginLeft:40}}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}


function Details( {route, navigation} ) {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: '#F5F3F3',
    
  },
  item: {
    padding: 20,
    marginVertical: 18,
    marginHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  title: {
    fontSize: 30,
   
  },
  
  clock: {
    marginTop: 18,
    marginLeft: 15,
    padding: 6,
    alignSelf:  "flex-start",
    backgroundColor: "green",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  
  logoutButton: {
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
const Stack = createStackNavigator();

export default function Discount() {
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
          component={Details} 
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