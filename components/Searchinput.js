import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Searchinput = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        width: '85%',
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        height: 35,
        borderRadius: 10,
        marginLeft: 1,
      }}>
      <AntDesign name="search1" size={22} color="#4f4a4a" />
      <TextInput
        placeholder="Search unique furniture..."
        style={{
          fontFamily: 'Medium',
          paddingHorizontal: 10,
          fontSize: 12,
        }}
      />
    </View>
  );
};

export default Searchinput;

const styles = StyleSheet.create({});
