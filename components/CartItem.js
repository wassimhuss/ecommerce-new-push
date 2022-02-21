import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import {Images, useTheme} from '@config';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../utils/colors/Colors';
const CartItem = props => {
  // return (
  //   <View style={styles.cartItem}>
  //     <View style={styles.itemData}>
  //       <Text style={styles.quantity}>{props.quantity} </Text>
  //       <Text style={styles.mainText}>{props.title}</Text>
  //     </View>
  //     <View style={styles.itemData}>
  //       <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
  //       <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
  //         <Feather name={'trash-2'} size={23} color={colors.orange} />
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );
  console.log(props);

  return (
    <View style={styles.cartItem}>
      <View
        style={{
          flex: 1,
        }}>
        <Image
          source={{uri:props.image}}
          style={{width: '100%', height: '100%'}}></Image>
      </View>
      <View style={{flex: 2.5, flexDirection: 'column', marginHorizontal: 5}}>
        <View>
        <Text style={styles.mainText}>
          {props.title}
           
        </Text>
        <Text>
        {props.DESCRIPTION}
        </Text>
        </View>
        
        <Text style={{...styles.mainText, flex: 1}}>
        ${props.productPrice.toFixed(2)}
        {" x "}
        {props.quantity.toFixed(0)}
          {" = "}
          ${props.amount.toFixed(2)}
        </Text>
      
        <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
          <Feather name={'trash-2'} size={23} color={colors.orange} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    width: '100%',
    height: 150,
    backgroundColor: 'white',
    flexDirection: 'row',
    //justifyContent: 'space-between',
    //marginHorizontal: 10,
    // marginRight: 10,
    marginBottom: 10,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'Heebo-Black',
    color: '#888',
    fontSize: 16,
  },
  mainText: {
    color: colors.darkGray,
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  deleteButton: {
    flex: 0.8,
    //  marginLeft: 20,
  },
});
CartItem.defaultProps = {
  description: '',
  title: '',
  style: {},
  image: '',
  costPrice: '',
  salePrice: '',
  salePercent: '',
  onPress: () => {},
  isFavorite: false,
};
export default CartItem;
