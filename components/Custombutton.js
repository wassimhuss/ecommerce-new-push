import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const Custombutton = props => {
  return (
    <TouchableOpacity
      onPress={props.go}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6495ED',
        height: 50,
        borderRadius: 8,
        marginHorizontal: 10,
        marginTop: 60,
      }}>
      <Text style={{color: 'white', fontSize: 20}}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default Custombutton;

const styles = StyleSheet.create({});
