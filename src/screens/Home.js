import { useState, useEffect }  from "react";
import * as React from 'react';
import { ActivityIndicator, RefreshControl, Button, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,View,Icon,Image } from "react-native";
import 'react-native-gesture-handler';
import { set } from "react-native-reanimated";
import {Picker} from '@react-native-picker/picker';

// Reference Samuel Meddows & mohshbool's answer at https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript?rq=1
function getDate() {
  var today = new Date();
  var dd_today = String(today.getDate()).padStart(2, '0');
  var mm_today = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy_today = today.getFullYear();

  var past = new Date(Date.now() - 31 * 24 * 60 * 60 * 1000) 
  var dd_past = String(today.getDate()).padStart(2, '0');
  var mm_past = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy_past = today.getFullYear();

  today = yyyy_today + '-' + mm_today + '-' + dd_today;
  past = yyyy_past + '-' + mm_past + '-' + dd_past;
  return [past, today]
}

export default function Home ( {navigation} ) {

  const [final, setfinal] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [request, setRequest] = useState({   
    shift: null,
    discount: []
  })
  const [selectedOrganisation, setSelectedOrganisation] = useState();
  const [error, setError] = useState('') 

  async function setUp(){
    await fetchUser()
    let discount = await fecthDiscount()
    let clock = await fetchClock()
    let filteredDis = await filterDiscount(discount, clock)
    await setRequest({         
      shift: clock,
      discount: filteredDis
    })  
    await setSelectedOrganisation(JSON.parse(localStorage.getItem('user')).organisation_id)
    await setLoading(false)     
  }
  async function fetchUser(){
    try {
      const fetchResult = await fetch(`https://my.tanda.co/api/v2/users/me`,{
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('tokenType')+ ' ' +localStorage.getItem('token')}})      
      if (!fetchResult.ok) {
        const errorMessage = `An error has occured: ${fetchResult.status}`;   
        throw Error(errorMessage)  
      }
      else {
        const user = await fetchResult.json()   
        localStorage.setItem('user', JSON.stringify(user))  
      }
    } catch(err) {
      console.log(err.message)  
      setError(err.message)
      return err
    }
  }

  async function fetchClock(){
    try {
      const user = JSON.parse(localStorage.getItem('user'))   
      const past = getDate()[0]
      const today = getDate()[1]
      const fetchResult = await fetch(`https://my.tanda.co/api/v2/clockins` + 
      `?user_id=${user.id}&from=${past}&to=${today}` ,{
        method: "GET",
        headers: {Authorization: localStorage.getItem('tokenType')+ ' ' +localStorage.getItem('token')}})
      if (!fetchResult.ok) {
        const errorMessage = `An error has occured: ${fetchResult.status}`;   
        throw Error(errorMessage)  
      }
      else {
        const clock = await fetchResult.json()
          
        if (clock.length > 0) {
          const t = clock[clock.length - 1].type
          if (t !== 'finish') {
            return true       
          } else {
            return false    
          }
        } else {
          return false     
        }
      }
    }
    catch(err) {
      console.log(err.message)  
      setError(err.message)
      return err
    }
  }

  async function fecthDiscount(){
    try {
      const fetchResult = await fetch(`https://my.tanda.co/api/v2/platform/discounts`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('tokenType')+ ' ' +localStorage.getItem('token')
        },
      })
      if (!fetchResult.ok) {
        const errorMessage = `An error has occured: ${fetchResult.status}`;   
        throw Error(errorMessage)  
      }
      else {
        const discount = await fetchResult.json()
        return discount
      }           
    }
    catch(err) {
      console.log(err.message)  
      setError(err.message)
      return err
    }
     
  }

  async function filterDiscount(discount, shift) {
    const filteredDiscount = await discount.filter((item) =>{
        return item.onshift === shift;
      }) 
      return filteredDiscount;          
  }

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
  useEffect(()=>{  
    setUp()
  },[])

  
  const onRefresh = React.useCallback(async () => {
    await setRefreshing(true);
    let discount = await fecthDiscount()
    let clock = await fetchClock()
    let filteredDis = await filterDiscount(discount, clock)
    await setRequest({         
      shift: clock,
      discount: filteredDis
    })  
    await setRefreshing(false)
  }, []);

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Discount Details', item)} style={[styles.item, backgroundColor]}>
      <Text style={[styles.disName, textColor]}>{item.name} </Text>
      <Text style={[styles.disValue, textColor]}> {item.value} </Text>
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
 
  
  if (loading !== true){
  
  return (
    <SafeAreaView style={styles.container}>
    <View style={{flexDirection:'row', 
    flexWrap:'wrap',}}>     
      {request.shift?  
        <View style={styles.clockin}>                
            <Text title="clocked in" style={{fontSize: 20, color: 'white', fontWeight: 'bold'}} >
                clocked in
            </Text>                  
        </View>:   
        <View style={styles.clockout}>              
            <Text title="clocked out" style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
                clocked out
            </Text>      
        </View>
      } 
      {JSON.parse(localStorage.getItem('user')).organisations.length === 1?
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
            {JSON.parse(localStorage.getItem('user')).organisations.map((org, index) => {                 
           
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
      {error ? <Text style={styles.error}>{error}</Text> : null}
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
   
    </SafeAreaView>)
  }
  else {
    return (
    <View style={[styles.container, styles.horizontal]}>      
      <ActivityIndicator size="large" color="#0000ff" />
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
    fontSize: 20,
    
  },
  disValue: {
    fontSize: 20,
    paddingLeft: 50,
    
  },
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockin: {
    width: '37%',
    height: 52,
    padding: 10,
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
    height: 52,
    padding: 10,
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
    marginTop: 10,
    color:'red',
  }
});