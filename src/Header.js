import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

export default function Header(){
    return(
        <View>
            <Image 
            style={styles.header}
            source={require('./image/tanda-logo-image.png')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width:64, 
        height:20,
    },
})