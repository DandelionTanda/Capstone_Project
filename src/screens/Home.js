import { useState, useEffect }  from "react";
import * as React from 'react';
import { ActivityIndicator, RefreshControl, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity,View, Image, Dimensions, PixelRatio } from "react-native";
import { set } from "react-native-reanimated";
import {Picker} from '@react-native-picker/picker';
import {fetchUser, fetchClock, fetchDiscount, getOrgToken} from '../networking/Api'
import filterDiscount from '../utilities/filterDiscount'
import MyButton from '../components/MyButton';
import { useScrollToTop } from '@react-navigation/native';

export const Item = ({ item,  onPress, backgroundColor, textColor }) => {
  return(  
    <TouchableOpacity 
      onPress={onPress}
      style={[styles.item, backgroundColor]}
      testID={`${item.name}`}>
      <Text style={[styles.disName, textColor]}>{item.name}</Text>
      <View style={styles.verticleLine}></View>
      <Text style={[styles.disValue, textColor]}>{item.value}</Text>
    </TouchableOpacity>
  );
};

export default function Home ( {navigation} ) {
  const [selectedId, setSelectedId] = useState(null);
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [request, setRequest] = useState({   
    user: null,
    shift: null,
    discount: []
  })
  const [user, setUser] = useState(null)
  const [selectedOrganisation, setSelectedOrganisation] = useState();
  const [error, setError] = useState('') 
  
  useEffect(async () => {  
    
    let user = await fetchUser()   
    let discount = await fetchDiscount()     
    let clock = await fetchClock(user.id)  
    if (user instanceof Error) {
          
      setError(user.message);
    }
    else if (discount instanceof Error) {  
      
      setError(discount.message);
    }
    else if (clock instanceof Error) {    
      setError(clock.message);
    }
    else {
      let filteredDis = await filterDiscount(discount, clock)   
      await setRequest({   
        user: user,      
        shift: clock,
        discount: filteredDis
      })  
      await setSelectedOrganisation(user.organisation_id)
    }
    await setLoading(false)  
  },[])

  
  const onRefresh = React.useCallback(async () => {
    
    await setRefreshing(true);
    let user = await fetchUser()   
    let discount = await fetchDiscount()
    let clock = await fetchClock(user.id)
    if (user instanceof Error) {     
      setError(user.message);
    }
    else if (discount instanceof Error) {    
      setError(discount.message);
    }
    else if (clock instanceof Error) {    
      setError(clock.message);
    }
    else {     
      setError("")
      let filteredDis = await filterDiscount(discount, clock)
      await setRequest({    
        user: user,     
        shift: clock,
        discount: filteredDis
      })  
    }

    await setRefreshing(false)
  }, []);
  const ref = React.useRef(null);
  useScrollToTop(ref);

  if (loading !== true){  
    if (error) {
      return (
        <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center',
          flexDirection: 'column',}}>
          <Text style={styles.error}>{error}</Text>
        <MyButton onPress={onRefresh} title={'Refresh'} buttonStyle={styles.refreshButton} textStyle={styles.buttonText}/> 
        </View>
      )
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <View style={{flexDirection:'row', 
          flexWrap:'wrap',}}>     
            {request.shift?  
            <View style={styles.clockin}>                
                <Text title="clocked in" style={styles.clockText} >
                    clocked in
                </Text>                  
            </View>:   
            <View style={styles.clockout}>              
                <Text title="clocked out" style={styles.clockText}>
                    clocked out
                </Text>      
            </View>
          } 
          {request.user.organisations.length === 1?
            null: 
            <View style={styles.picker}>  
              <Picker   
                testID='switch-company-drop-menu'      
                selectedValue={selectedOrganisation}
                onValueChange={async (itemValue, itemIndex) =>{
                  
                  setRefreshing(true);
                  await setSelectedOrganisation(itemValue);               
                  await getOrgToken(itemValue);    
                  let user = await fetchUser()   
                  let discount = await fetchDiscount()                
                  let clock = await fetchClock(user.id)
                  if (user instanceof Error) {     
                    setError(user.message);
                  }
                  else if (discount instanceof Error) {    
                    setError(discount.message);
                  }
                  else if (clock instanceof Error) {    
                    setError(clock.message);
                  }
                  else {     
                    setError("")
                    let filteredDis = await filterDiscount(discount, clock)
                    await setRequest({    
                      user: user,     
                      shift: clock,
                      discount: filteredDis
                    })  
                  }                             
                  setRefreshing(false);     
                          
                }} 
                mode='dropdown'  
                style={styles.pickerElement}
                
              >           
                {request.user.organisations.map((org, index) => {                 
              
                  if(org.id === selectedOrganisation) {
                    return <Picker.Item label={org.name} value={org.id} key={index} style={{color:'#2F57BD'}}/>
                  }           
                  else {
                    return <Picker.Item label={org.name} value={org.id} key={index} />
                  }                                                                  
                })}        
              </Picker>  
            </View>  
          }
          </View>  
          
          <FlatList   
            ref={ref}
            testID='discount-list'       
            data={request.discount}
            renderItem={({item, index}) => {
              const backgroundColor = '#45B8DB';
              const color = 'white';
              return (
                <Item
                  item={item}          
                  onPress={() => navigation.navigate('Discount', {discount:item, user:request.user})}
                  backgroundColor={{ backgroundColor }}
                  textColor={{ color }}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}               
            style={{marginVertical: 10}}  
            refreshControl={             
              <RefreshControl              
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }  
            ListEmptyComponent={() => 
              {
                if (request.shift) {
                  return <Text testID="no-discounts" style={{textAlign: 'center', marginTop: 50, fontSize: 20}}>
                          Sorry, no on-shift discounts found.
                        </Text>;       
                }   
                else {
                  return <Text testID="no-discounts" style={{textAlign: 'center', marginTop: 50, fontSize: 20}}>
                          Sorry, no off-shift discounts found.
                        </Text>;
                }                                 
              }
            }
          />      
        </SafeAreaView>
      )
    }
  }
  else {
    return (
    <View style={[styles.container, styles.horizontal]}>      
      <ActivityIndicator size="large" color="#0000ff"/>
    </View>
    )
  }
  
};

// Retrieve initial screen's width
let screenWidth = Dimensions.get('screen').width;

// Retrieve initial screen's height
let screenHeight = Dimensions.get('screen').height;
let styles;

if (screenWidth < 350) {
  styles = StyleSheet.create({
    container: {
      flex: 1,    
      backgroundColor: '#F5F3F3',
      marginTop: 24,
      marginLeft: 24,
      marginRight: 24,
      marginBottom: 24
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    },
    item: {
      padding: 16,
      marginVertical: 8,    
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      flexDirection:'row', 
      flexWrap:'wrap',
      
    },
    disName: {
      fontSize: 16,
      width: '70%'
    },
    disValue: {
      fontSize: 16,    
      width: '25%',
      textAlign: 'center'
    },
    verticleLine: {
      height: '100%',
      width: 1,
      backgroundColor: 'white',
    },
    scrollView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    clockin: {     
      width: '40%',
      height: 40,    
      justifyContent: 'center',   
      color: "white",
      alignSelf:  "flex-start",
      backgroundColor: "green",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    clockout: {    
      width: '40%', 
      height: 40,   
      color: "white",     
      justifyContent: 'center',  
      alignSelf:  "flex-start",
      backgroundColor: "red",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    clockText: {
      textAlign:'center',
      fontSize: 16,
      color: 'white', 
      fontWeight: 'bold'
    },
    picker: {
      borderWidth: 3,
      borderColor: 'grey',  
      width: '55%', 
      height: 40,   
      marginLeft:10,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    pickerElement: {
      color:'black', 
      marginVertical:-8
    },
    error: {
      fontSize:20,
      alignItems: "center",
      justifyContent: 'center',
      color:'red',
    },
    refreshButton:{
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft:20,
      marginRight:20,
      paddingVertical: 16,
      borderRadius: 4,  
      backgroundColor: '#45B8DB',
      position:"relative",
      top:20,
      width: '40%'
    },
    buttonText:{
      fontSize: 20, 
      fontWeight: "bold", 
      color: 'white'
    }
  });
} else {
  styles = StyleSheet.create({
    container: {
      flex: 1,    
      backgroundColor: '#F5F3F3',
      marginTop: 24,
      marginLeft: 24,
      marginRight: 24,
      marginBottom: 24
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    },
    item: {
      padding: 16,
      marginVertical: 16,    
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      flexDirection:'row', 
      flexWrap:'wrap',
      
    },
    disName: {
      fontSize: 20,
      width: '70%'
    },
    disValue: {
      fontSize: 20,    
      width: '25%',
      textAlign: 'center'
    },
    verticleLine: {
      marginLeft: 10,
      height: '100%',
      width: 1,
      backgroundColor: 'white',
    },
    scrollView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    clockin: {     
      width: '40%',
      height: 50,    
      justifyContent: 'center',   
      color: "white",
      alignSelf:  "flex-start",
      backgroundColor: "green",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    clockout: {    
      width: '40%', 
      height: 50,   
      color: "white",     
      justifyContent: 'center',  
      alignSelf:  "flex-start",
      backgroundColor: "red",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    clockText: {
      textAlign:'center',
      fontSize: 20,
      color: 'white', 
      fontWeight: 'bold'
    },
    picker: {
      borderWidth: 3,
      borderColor: 'grey',  
      width: '55%', 
      height: 50,   
      marginLeft:10,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    pickerElement: {
      color:'black', 
      marginVertical:-6
    },
    error: {
      fontSize:20,
      alignItems: "center",
      justifyContent: 'center',
      color:'red',
    },
    refreshButton:{
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft:20,
      marginRight:20,
      paddingVertical: 16,
      borderRadius: 4,  
      backgroundColor: '#45B8DB',
      position:"relative",
      top:20,
      width: '40%'
    },
    buttonText:{
      fontSize: 20, 
      fontWeight: "bold", 
      color: 'white'
    }
  });
}