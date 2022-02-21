import React from 'react';
import {StyleSheet, Text, View, Platform, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../utils/colors/Colors';
import STYLES from '../utils/styles';
const Header = ({goback, title}) => {
  return (
    <View
      style={{
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        width: '100%',
        height: 50,
        borderBottomWidth: 0.2,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: title === 'My Cart' ? 'center' : 'space-between',
        flexDirection: 'row',
      }}>
      {title === 'My Cart' ? null : (
        <TouchableOpacity
          onPress={() => {
            goback();
          }}>
          <Icon
            name="arrow-back-ios"
            color={COLORS.gray}
            size={20}
            style={{alignSelf: 'center', marginHorizontal: 10}}
          />
        </TouchableOpacity>
      )}

      <Text
        style={{
          fontSize: 20,
          color: 'black',
          fontFamily: 'Roboto-Medium',
          marginRight: title === 'My Cart' ? 0 : 35,
        }}>
        {title}
      </Text>
      <Text></Text>
    </View>
  );
};

export default Header;
