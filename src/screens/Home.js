import { useState, useEffect }  from "react";
import * as React from 'react';
import { ActivityIndicator, RefreshControl, Button, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,View,Icon,Image, Dimensions, PixelRatio } from "react-native";
import 'react-native-gesture-handler';
import { set } from "react-native-reanimated";
import {Picker} from '@react-native-picker/picker';
import {fetchUser, fetchClock, fecthDiscount} from '../networking/Api'
import filterDiscount from '../utilities/filterDiscount'
// Retrieve initial screen's width
let screenWidth = Dimensions.get('screen').width;

// Retrieve initial screen's height
let screenHeight = Dimensions.get('screen').height;

function modifyFont(screenWidth){
  if(screenWidth < 350)
  {
    return 16
  }
  else{
    return 19
  }
}

function modifyShift(screenWidth){
  if(screenWidth < 350)
  {
    return 8
  }
  else{
    return 10
  }
}

function modifyShiftSize(screenWidth){
  if(screenWidth < 350)
  {
    return 42
  }
  else{
    return 52
  }
}



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
 
  /*
  async function getOrgToken(org_id){
    const responseToken = await fetch(`https://my.tanda.co/api/oauth/token`,{
      method: "POST",
      body: JSON.stringify({
        access_token:localStorage.getItem('token'),
        organisation_id:org_id,
        scope:"me user device platform organisation",
        grant_type:"partner_token"
      })
      })
    const token = await responseToken.json()   
    localStorage.setItem('token', token.access_token)
    localStorage.setItem('tokenType', token.token_type)     
  }
  */
  
  useEffect(async () => {  
    let user = await fetchUser()   
    let discount = await fecthDiscount()     
    let clock = await fetchClock(user.id)  
    if (user instanceof Error || discount instanceof Error || clock  instanceof Error) {
      setError("ooops, there is an error from server")
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
    let discount = await fecthDiscount()
    let clock = await fetchClock(user.id)
    if (user instanceof Error || discount instanceof Error || clock  instanceof Error) {
      setError("ooops, there is an error from server")
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

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Discount', item)} style={[styles.item, backgroundColor]}>
      <Text style={[styles.disName, textColor]}>{item.name} </Text>
      <View style={styles.verticleLine}></View>
      <Text style={[styles.disValue, textColor]}> {item.value} </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }) => {
    const backgroundColor = '#45B8DB';
    const color = 'white';

    return (
        <Item
          item={item}
          onPress={() => setSelectedId(index)}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
    );
  };
  
  if (loading !== true){  
    if (error) {
      return <Text style={styles.error}>{error.message}</Text>
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <View style={{flexDirection:'row', 
          flexWrap:'wrap',}}>     
            {request.shift?  
            <View style={styles.clockin}>                
                <Text title="clocked in" style={{fontSize: modifyFont(screenWidth), color: 'white', fontWeight: 'bold'}} >
                    clocked in
                </Text>                  
            </View>:   
            <View style={styles.clockout}>              
                <Text title="clocked out" style={{fontSize: modifyFont(screenWidth), color: 'white', fontWeight: 'bold'}}>
                    clocked out
                </Text>      
            </View>
          } 
          {request.user.organisations.length === 1?
            null: 
            <View style={styles.picker}>  
              <Picker         
                selectedValue={selectedOrganisation}
                onValueChange={async (itemValue, itemIndex) =>{
                  setRefreshing(true);
                  await setSelectedOrganisation(itemValue);               
                  //await getOrgToken(itemValue);            
                  // await fetchUser();           
                  //await fecthDiscount();     
                  setRefreshing(false);     
                          
                }} 
                mode='dropdown'  
                style={{color:'black', marginVertical:-4}}
                
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
            data={request.discount}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}               
            style={{marginVertical: 10}}  
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
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
const styles = StyleSheet.create({
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
    fontSize: modifyFont(screenWidth),
    width: '70%'
  },
  disValue: {
    fontSize: modifyFont(screenWidth),    
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
    width: '37%',
    height: modifyShiftSize(screenWidth),
    padding: modifyShift(screenWidth),
    paddingLeft: 15,
    color: "white",
    alignSelf:  "flex-start",
    backgroundColor: "green",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  clockout: {    
    width: '37%', 
    height: modifyShiftSize(screenWidth),
    padding: modifyShift(screenWidth),
    color: "white",
    alignSelf:  "flex-start",
    backgroundColor: "red",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  
  picker: {
    borderWidth: 3,
    borderColor: 'grey',  
    width: '60%', 
    height: 52,
    
    marginLeft:10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  error: {
    fontSize:20,
    alignItems: "center",
    justifyContent: 'center',
    color:'red',
  }
});