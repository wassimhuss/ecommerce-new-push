import React from 'react';
import {StyleSheet, Text, View, TextInput, Image} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import STYLES from '../utils/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../utils/colors/Colors';
const CustomInput = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginLeft: 7,
      }}>
      <Image
        source={require('../utils/images/lebanon.png')}
        style={{width: 18, height: 18, marginLeft: 5}}
      />
      <Text
        style={{
          fontSize: 19,
          marginLeft: 5,
          justifyContent: 'center',
          marginBottom: 1,
          color: props.err && props.errtouch ? 'red' : 'black',
        }}>
        +961
      </Text>
      <TextInputMask
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
        placeholder="phone number"
        keyboardType="numeric"
        style={{
          width: '100%',
          color: 'black',
          fontSize: 19,
          height: 60,

          justifyContent: 'center',
        }}
        maxLength={9}
        mask={'[00] [000000]'}
      />
      <Text></Text>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({});
