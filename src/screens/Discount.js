import { useState }  from "react";
import * as React from 'react';
import { SafeAreaView, Dimensions, StyleSheet, Text, TouchableOpacity,View,Icon,Image, ScrollView } from "react-native";
import { get } from "react-native/Libraries/Utilities/PixelRatio";

export default function Discount( {route, navigation} ) {

  const discount = route.params.discount
  const user = route.params.user
  return (
    <ScrollView style={{flex: 1, marginBottom: 24}}>
      <View>
        <Image 
        style={styles.logo}
        source={require('../image/tanda-logo-image.png')}
        testID={'Logo'}/>
        
      </View>
      {/*Discount view */}
      <View style={styles.discount}>
        <Text style={styles.valueDiscount}>
          {discount.value}
        </Text>
        <Text style={styles.nameDiscount}>
          {discount.name} 
        </Text>
        {discount.onshift? 
          <Text style={styles.nameDiscount}>
            on-shift
          </Text>:
          <Text style={styles.nameDiscount}>
            off-shift
          </Text>
        }
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

//small screen
if(width<350){
  styles = StyleSheet.create ({
    personalInfor:{
      marginLeft:30,
      marginRight:30,
      borderBottomColor: 'black',
      borderBottomWidth: 1,      
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
      marginTop:20,
      paddingBottom:10,
      borderWidth: 2,
      marginBottom:15,
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
    },
    label:{
      marginTop:10,
      fontSize: 22,
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
      paddingBottom:15,
      marginTop:24,
      marginBottom: 16,
      borderWidth: 2,    
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
    },
  });

}
  