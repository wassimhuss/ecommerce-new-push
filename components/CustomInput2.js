import React from 'react';
import {StyleSheet, Text, View, TextInput, Image} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import STYLES from '../utils/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../utils/colors/Colors';
const CustomInput2 = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 44,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
      }}>
      <View>
        <Text
          style={{
            fontSize: 16,
            marginLeft: 10,
            justifyContent: 'center',
            marginBottom: 1,
            color: props.err && props.errtouch ? 'red' : 'black',
          }}>
          {props.title}
        </Text>
      </View>
      <View>
        {/* {props.type == 'password' ? secureTextEntry : null} */}
        <TextInput
          //value="blalaba"
          onChangeText={props.onChangeText}
          onBlur={props.onBlur}
          secureTextEntry={props.type == 'password' ? true : false}
          keyboardType="numbers-and-punctuation"
          style={{
            alignSelf: 'center',
            width: 170,
            color: 'black',
            fontSize: 19,
            height: 60,
            justifyContent: 'center',
            // position: 'relative',
          }}
        />
      </View>
    </View>
  );
};

export default CustomInput2;

const styles = StyleSheet.create({});
