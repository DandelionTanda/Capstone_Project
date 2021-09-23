import { useState }  from "react";
import * as React from 'react';
import { Button, FlatList, SafeAreaView, StatusBar, Dimensions, StyleSheet, Text, TouchableOpacity,View,Icon,Image, ScrollView } from "react-native";
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
      <View>
        <Image 
        style={styles.logo}
        source={require('../image/tanda-logo-image.png')}/>
      </View>
      {/*Discount view */}
      <View style={styles.discount}>
        <Text style={styles.valueDiscount}>
          {route.params.value}
        </Text>
        <Text style={styles.nameDiscount}>
          {route.params.name} 
        </Text>
      </View>

      {/*display personal information*/}
      <View style= {styles.personalInfor}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.infor}>{user.name}</Text>
      </View>
      <View style= {styles.personalInfor}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.infor}>{user.email}</Text>
      </View>
      <View style= {styles.personalInfor}>
        <Text style={styles.label}>Employee ID</Text>
        <Text style={styles.infor}>{user.id}</Text>
      </View>
      <View style= {styles.personalInfor}>
        <Text style={styles.label}>Organisation</Text>
        <Text style={styles.infor }>{user.organisation}</Text>
      </View>
    </ScrollView>
  );
}
  
// Retrieve initial screen's width
let width = Dimensions.get('screen').width;

// Retrieve initial screen's height
let height = Dimensions.get('screen').height;

{/*Custom styles*/}
let styles;
if(width < height){
  //small screen
  if(width<350){
    styles = StyleSheet.create ({
      personalInfor:{
        marginLeft:30,
        marginRight:30,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom:24
      },
      label:{
        marginTop:10,
        fontSize: 20,
        fontWeight: "bold",
        color: '#1D87E3'
      },
      infor:{
        fontSize: 16,
        color: '#232A22',
        lineHeight: 40,
      },
      logo:{
        height:20,
        width:56,
        alignSelf:'flex-end',
        marginRight:20,
        marginTop:20
      },
      discount:{
        alignSelf: 'baseline',
        width: 250,
        alignSelf:'center',
        marginTop:32,
        borderWidth: 2,
        marginBottom:20,
        backgroundColor:'#45B8DB',
        borderRadius: 100/2
      },
      valueDiscount:{
        fontSize: 90,
        color: 'white',
        alignSelf:'center'
      },
      nameDiscount:{
        fontSize: 18,
        color: 'white',
        fontWeight:'bold',
        alignSelf:'center',
        marginBottom:20
      },
    });
  }
  //large screen
  else{
  styles = StyleSheet.create({
    personalInfor:{
      marginLeft:30,
      marginRight:30,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      marginBottom:24
    },
    label:{
      marginTop:10,
      fontSize: 28,
      fontWeight: "bold",
      color: '#1D87E3'
    },
    infor:{
      fontSize: 20,
      color: '#232A22',
      lineHeight: 40,
    },
    logo:{
      height:24,
      width:64,
      alignSelf:'flex-end',
      marginRight:20,
      marginTop:20
    },
    discount:{
      alignSelf: 'baseline',
      width: 300,
      alignSelf:'center',
      marginTop:40,
      borderWidth: 2,
      marginBottom:20,
      backgroundColor:'#45B8DB',
      borderRadius: 100/2
    },
    valueDiscount:{
      fontSize: 110,
      color: 'white',
      alignSelf:'center'
    },
    nameDiscount:{
      fontSize: 24,
      color: 'white',
      fontWeight:'bold',
      alignSelf:'center',
      marginBottom:20
    },
  });
}
}
  