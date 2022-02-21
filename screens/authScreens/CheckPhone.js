import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const CheckPhone = () => {
  return (
    <View>
      <View
        style={{
          height: 65,
          backgroundColor: 'red',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <View style={{flex: 1}}>
          <MaterialCommunityIcons name="home-outline" size={29} />
        </View>

        <View style={{flex: 2}}>
          <Text
            style={{color: 'white', fontSize: 18, fontFamily: 'Roboto-Bold'}}>
            Verification Code
          </Text>
        </View>
        {/* <View>
          <Text style={{alignSelf: 'center'}}></Text>
        </View> */}
      </View>
      <Text></Text>
    </View>
  );
};

export default CheckPhone;

const styles = StyleSheet.create({});
