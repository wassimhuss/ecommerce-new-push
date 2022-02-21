import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Custombutton from '../../components/Custombutton';
import Header from '../../components/Header';
import Cart2 from './Cart2';

const Cart = ({navigation}) => {
  let gohome = () => {
    navigation.navigate('Home');
  };
  let goEhome = (item) => {
    navigation.navigate('ECart',{item:item});
  };

  return (
    <View>
      <Header title="My Cart" />
      {/* <Image
        source={require('../../utils/images/cart1.png')}
        style={{alignSelf: 'center', width: 180, height: 180, marginTop: 30}}
      />
      <View style={{alignSelf: 'center', marginTop: 25}}>
        <Text style={{fontSize: 18, color: 'gray'}}>Your cart is empty</Text>
      </View>
      <Custombutton title="Start Shopping" go={gohome} /> */}
      <Cart2 goEhome={goEhome} gohome={gohome} />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({});
