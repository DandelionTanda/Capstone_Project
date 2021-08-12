import { useState, useEffect }  from "react";
import * as React from 'react';
import { Button, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,View,Icon,Image } from "react-native";
import 'react-native-gesture-handler';

export default function Home ( {navigation} ) {

  const [DATA, setDATA] = useState([])
  const [load, setload] = useState(false)
  const [refeshing, setRefeshing] = useState(false)
  const [shift, setShift] = useState(true)

 
  async function waitfecth(){

    const response = await fetch(`https://my.tanda.co/api/v2/platform/discounts` ,{
      method: "GET",
      headers: {Authorization: localStorage.getItem('tokenType')+ ' ' +localStorage.getItem('token')}})
      const data = await response.json()
      const mapData = await setDATA(data)
      return mapData
  }

  useEffect(()=>{
    waitfecth()
  },[])

  const handRefresh = () =>{
    setRefeshing(true)
  }

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
        <TouchableOpacity>
        {shift?
          <Text title="clocked in" style={{fontSize: 20, color: 'white', fontWeight: 'bold'}} onPress={()=> setShift(false)}>
              clocked in
          </Text>:<Text title="clocked in" style={{fontSize: 20, color: 'white', fontWeight: 'bold'}} onPress={()=> setShift(true)}>
              clocked out
          </Text>}
        </TouchableOpacity>  
      </View>                 
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}        
        // extraData={selectedId}
        style={{marginVertical: 25,}}
        // refeshing={refeshing}
        // onRefresh={handRefresh}
      />    
    </SafeAreaView>
    
  );
};
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
    color: "white",
    alignSelf:  "flex-start",
    backgroundColor: "green",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  
  logoutButton: {
    marginTop: 200,
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