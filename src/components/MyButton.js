import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
const MyButton = ({ onPress, title, buttonStyle, textStyle }) => {

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      {title==='Log out'?<Ionicons name="log-out" size={35} color="white" testID="log-out-icon"/>:null}
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;