import {
  Button,
  ProductColorPicker,
  ProductList,
  ProductSize,
  FormCounterSelect,
  Text,
} from '@components';
import {useTheme} from '@config';
import {EFilterColors, EFilterSizes} from '@data';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View ,TouchableOpacity,Alert } from 'react-native';
import * as cartActions from '../../../../store/actions/cart';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import styles from './styles';

const ModalProduct = props => {
  console.disableYellowBox = true;
  const auth = useSelector(state => state.Login);
  const login = auth.success;
 let  grantAccess = ()=> {
    return (
      Alert.alert(
        "Account not found",
        "please Login Or Create an Account",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Okay", onPress: () =>  props.toLogin() }
        ]
      )
    );
  }
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const {t} = useTranslation();
  const cardColor = colors.card;
  const {onApply, item, go,onSwipeComplete, colorChoosedInit, sizeChoosedInit, ...attrs} = props;
  const [eColors, setEcolors] = useState(EFilterColors);
  const [eSizes, setESizes] = useState(EFilterSizes);
  const [colorChoosed, setColorChoosed] = useState(colorChoosedInit);
  const [sizeChoosed, setSizeChoosed] = useState(sizeChoosedInit);
  const [total, setTotal] = useState(0);
  const [quantity, setquantity] = useState(1);
  //   console.log(quantity)
  // console.log(total)
  let newData= {...item, 'Tprice' : total , 'quantity' : quantity}
  console.log('my new data ' +JSON.stringify(newData))
  useEffect(() => {
    setColorChoosed(colorChoosedInit);
  }, [colorChoosedInit]);

  useEffect(() => {
    setSizeChoosed(sizeChoosedInit);
  }, [sizeChoosedInit]);

  useEffect(() => {
    setTotal(item.DISCOUNT_PRICE);
  }, [item]);

  //const {image, title, category, salePrice, costPrice, price} = item;
  // console.log('myimagaeeeeeeeeeeeee :  ' + image);
  return (
    <Modal swipeDirection={['down']} style={styles.bottomModal} {...attrs}
    onBackButtonPress={()=>onSwipeComplete()}
    //onSwipeCancel={()=>onSwipeComplete()}
    onBackdropPress={()=>onSwipeComplete()}
    >
      <View style={[styles.contentFilterBottom, {backgroundColor: cardColor}]}>
        <View style={styles.contentSwipeDown}>
          <View style={styles.lineSwipeDown} />
        </View>
        <View style={{paddingVertical: 20}}>
          <ProductList
            image={item.My_Uploaded_files[0]?.My_URL}
            title={item.NAME}
            description={item.DESCRIPTION}
            salePrice={"$"+item.DISCOUNT_PRICE+',00'}
            costPrice={'$'+item.FULL_PRICE+',00'}
            isFavorite={true}
          />
        </View>
        {/* <View style={{flexDirection: 'row', marginBottom: 8}}>
          <Text body1>{t('color').toUpperCase()}</Text>
          <Text
            headline
            style={{
              paddingHorizontal: 4,
            }}>
            {`${colorChoosed.name}`.toUpperCase()}
          </Text>
        </View>
        <ProductColorPicker
          colorChoosed={colorChoosed}
          colors={eColors}
          onPress={color => setColorChoosed(color)}
        /> */}
{/* 
        <View style={{flexDirection: 'row', marginBottom: 8, marginTop: 20}}>
          <Text body1>{t('size').toUpperCase()}</Text>
          <Text
            headline
            style={{
              paddingHorizontal: 4,
            }}>
            {`${sizeChoosed.name}`.toUpperCase()}
          </Text>
        </View>
        <ProductSize
          sizeChoosed={sizeChoosed}
          sizes={eSizes}
          onPress={size => setSizeChoosed(size)}
        /> */}

        <View
          style={{
            // backgroundColor:'red',   
            flexDirection: 'row',
            marginBottom: 8,
            marginTop: 20,
            justifyContent: 'space-between',
          }}>
          <View>
            <Text body1>{t('quantity').toUpperCase()}</Text>
            <FormCounterSelect
              isRow={true}
              label={''}
              detail={''}
              style={{
                marginTop: 8,
                backgroundColor: 'transparent',
                padding: 0,
                justifyContent: 'center',
                flex: 0,
              }}
              onChange={value => {
                console.log(value)
                setquantity(value)
                setTotal(value * item.DISCOUNT_PRICE);
                
              }}
            />
          </View>
          <View>
            <Text body1 style={{textAlign: 'right'}}>
              {t('total').toUpperCase()}
            </Text>
            <Text title3 style={{textAlign: 'right', marginTop: 12}}>
              {`$${total.toFixed(2)}`}
            
            </Text>
          </View>
        </View>
          {total == 0 ? 
                <Button
                full
                style={{marginTop: 10, marginBottom: 20}}
              >
                please select quantity
              </Button> 
              :  <Button
              full
              style={{marginTop: 10, marginBottom: 20}}
              onPress={
                login ? 
                ()=>{
                  dispatch(cartActions.addToCart(newData));
                  onSwipeComplete();
                  go();
                }
                : ()=>{grantAccess()}
              }>
              {t('add to cart')}
            </Button>
        }
      </View>
    </Modal>
  );
};

ModalProduct.defaultProps = {
  onApply: () => {},
};

ModalProduct.propTypes = {
  onApply: PropTypes.func,
};

export default ModalProduct;
