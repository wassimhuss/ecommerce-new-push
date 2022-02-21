import React from 'react';
import {View, Text, FlatList, Button, StyleSheet, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as cartActions from '../../store/actions/cart';
import Colors from '../../utils/colors/Colors';
import CartItem from '../../components/CartItem';
import Custombutton from '../../components/Custombutton';

const Cart2 = props => {
  const dispatch = useDispatch();
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {

      transformedCartItems.push({
        PRODUCT_ID: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        QUANTITY: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
        IMAGE :state.cart.items[key].IMAGE,
        DESCRIPTION:state.cart.items[key].DESCRIPTION,
        total:cartTotalAmount
      });
    }
  //  console.error(cartItems)
     //console.log('myyyyyyyyyyyyyyyyyy looooooooooooooooooooooog'+JSON.stringify(transformedCartItems));
    return transformedCartItems.sort((a, b) =>
      a.PRODUCT_ID > b.PRODUCT_ID ? 1 : -1,
    );
  });
    console.log(cartItems)
  return (
    <View style={styles.screen}>
      {cartItems.length === 0 ? null : (
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Total:{' '}
            <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
          </Text>
          <Button
            onPress={()=>props.goEhome(cartItems)}
            color={Colors.orange}
            title="Order Now"
            disabled={cartItems.length === 0}
          />
        </View>
      )}

      <FlatList
        data={cartItems}
        keyExtractor={item => item.PRODUCT_ID}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.QUANTITY}
            title={itemData.item.productTitle}
            DESCRIPTION={itemData.item.DESCRIPTION}
            amount={itemData.item.sum}
            image={itemData.item.IMAGE}
            productPrice={itemData.item.productPrice}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.PRODUCT_ID));
            }}
          />
        )}
      />
      {cartItems.length === 0 ? (
        <>
          <Image
            source={require('../../utils/images/cart1.png')}
            style={{
              alignSelf: 'center',
              width: 180,
              height: 180,
              marginTop: 30,
            }}
          />
          <View style={{alignSelf: 'center', marginTop: 25}}>
            <Text style={{fontSize: 18, color: 'gray'}}>
              Your cart is empty
            </Text>
          </View>
          <Custombutton title="Start Shopping" go={props.gohome} />
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 15,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.orange,
  },
});

export default Cart2;
