import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,View,Icon,Image } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";

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

const Discount = () => {
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
        <View style={styles.header}>
            <View style={styles.clock}>
                <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
                    Clocked In
                </Text>
            </View>
            
        </View>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}        
        extraData={selectedId}
        style={{marginVertical: 25,}}
      />
      <View style={styles.footer}>
            <TouchableOpacity  style={styles.leftFooter}>
                <Image
                    source={require('E:/First_React_Native_App/AwesomeProject/discount.png')} 
                    style={{ width: 20, height: 20, marginLeft: 20,}}
                    tintColor='#45B8DB'
                />
                <Text style={{fontSize: 15, color: '#45B8DB', fontWeight: "bold"}}>
                    Discount
                </Text>       
            </TouchableOpacity>
            <TouchableOpacity  style={styles.rightFooter}>
                <Image
                    source={require('E:/First_React_Native_App/AwesomeProject/user_icon_004.png')} 
                    style={{ width: 20, height: 20,}}
                    tintColor='#45B8DB'
                />
                <Text style={{fontSize: 15, color: '#45B8DB', fontWeight: "bold",}}>
                    Me
                </Text>            
            </TouchableOpacity>
        </View>

    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: 'lightgrey',
    
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
  header: {      
    backgroundColor: "#45B8DB",
    height: 60, 
    width: "100%", 
    
  },
  clock: {
    marginTop: 8,
    padding: 6,
    alignSelf:  "center",
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

export default Discount;