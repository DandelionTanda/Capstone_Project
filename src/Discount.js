import React, { useState } from "react";
import { Button, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,View,Icon,Image } from "react-native";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.name} {item.value} </Text>
  </TouchableOpacity>
);

const HomeStack = createStackNavigator();
const MeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => {
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

function Me() {
  return (
    <View style={{ flex: 1, justifyContent: 'center',  width:'50%', alignSelf:'center' }}>
      <Button        
        title="Log out"
        color="#E3310E"          
      />
    </View>
  );
}
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ 
          tabBarLabel: 'Home!' ,
          headerStyle: {
            backgroundColor: '#45B8DB',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center'
        }}
        
      />
    </HomeStack.Navigator>
  );
}

function MeStackScreen() {
  return (
    <MeStack.Navigator>
      <MeStack.Screen
        name="Me"
        component={Me}
        options={{ 
          tabBarLabel: 'Me!' ,
          headerStyle: {
            backgroundColor: '#45B8DB',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center'
        }}
      />
    </MeStack.Navigator>
  );
}


function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStackScreen"
      tabBarOptions={{
        activeTintColor: '#45B8DB',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
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
        component={MeStackScreen}
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
    padding: 6,
    alignSelf:  "flex-start",
    backgroundColor: "green",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  footer: {    
    flexDirection: 'row',    
    justifyContent: 'space-between',
    backgroundColor: "white",
    height: 60, 
    width: "100%", 
    
  },
  leftFooter: {
    marginLeft: 40,
    marginTop: 11,
   
  },
  rightFooter: {
    marginRight: 40,
    marginBottom: 8,
    alignSelf: 'flex-end',
    
  },
});

export default function Discount() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}