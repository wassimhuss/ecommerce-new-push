import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Custombutton from '../../components/Custombutton';
import Header from '../../components/Header';

const Profile = () => {
  return (
    <View>
      <Header title="My Account" />
      <Image
        source={require('../../utils/images/profile1.png')}
        style={{alignSelf: 'center', width: 180, height: 240, marginTop: 20}}
      />
      <View style={{alignSelf: 'center', marginTop: 5}}>
        <Text style={{fontSize: 18, color: 'gray'}}>Please Sign In</Text>
      </View>
      <Custombutton title="Sign In" />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
