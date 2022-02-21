/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {StyleSheet, Text, View ,Button} from 'react-native';
import LottieView from 'lottie-react-native';
import COLORS from '../../utils/colors/Colors';
import * as functions from '../../api/APIs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actions from '../../store/actions/product';
import {useDispatch, useSelector} from 'react-redux';
const index = ({navigation}) => {
  let handleRedirection = (result) => {
   // console.log(result)
    if (result) {
    alert('please check ur internet connection')
    }
     else {
     // alert('no error')
     // return navigation.replace("EPayment",{items:items}) 
    }
  };
  const userdata = useSelector(state => state.Login.userData)
  
 // console.warn('userdata : ' + JSON.stringify(userdata))
  const dispatch = useDispatch();
  //let products;
  let getMultiple = async () => {
    let email;
    let password;
    try {
      email = await AsyncStorage.getItem('email');
      password = await AsyncStorage.getItem('password');
    } catch (e) {
    }
  };

  const allProductsHandler = products =>{
    dispatch(actions.GetProduct(products));
  }
  async function getAboutUs(ownerID){
    result = await functions.Get_About_us_By_OWNER_ID(ownerID);
   // console.error('my result with abed  ' + result)
    if (result !== null && result !== undefined) {
      // alert(JSON.stringify(result));
      dispatch(actions.GetAboutUs(result));
    // console.error('result from API'+result.My_Result.NAME)
    }
  }
  async function checkNet(ownerID){
    result = await functions.CHECKNET(ownerID).then(({error}) =>
    handleRedirection(error)
  );

  }
  async function getProducts(ownerID){
    result = await functions.Get_Product_By_By_Where(ownerID);
   // console.error('my result with abed  ' + result)
    if (result !== null && result !== undefined) {
      // alert(JSON.stringify(result));
      allProductsHandler(result);
    // console.error('result from API'+result.My_Result.NAME)
    }
  }
  async function Getcourasel(NAME){
    result = await functions.Get_Category_By_Where(NAME);
   // console.error('my result with abed  ' + result)
    if (result !== null && result !== undefined) {
      // alert(JSON.stringify(result));
     // console.log('my categories : '  + JSON.stringify(result))
      dispatch(actions.GetCourasel(result));
    // console.error('result from API'+result.My_Result.NAME)
    }
  }
  //console.log('asjfgashfsdhgfjhagfhja' + JSON.stringify(product));
  useEffect(() => {
    getProducts(1)
   // getcategories(1)
   Getcourasel('photos')
    getAboutUs(1)
    //dispatch(actions.GetProduct(1));
    getMultiple();
    checkNet(1)
  }, []);//
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={{flexDirection: 'row', marginTop: 60, marginBottom: 40}}>
        <Text style={{fontWeight: 'bold', fontSize: 36, color: COLORS.dark}}>
          Online
        </Text>
        <Text
          style={{fontWeight: 'bold', fontSize: 36, color: COLORS.secondary}}>
          Shop
        </Text>
      </View>
      <LottieView
        source={require('../../utils/lottieAnimations/20542-bag-with-stuff.json')}
        onAnimationFinish={() => navigation.replace('MyTabs')}
        autoPlay
        loop={false}
        speed={2}
        style={{width: 350, height: 350}}
      />
      {/* <Button title='hello' onPress={()=>functions.Get_Product_By_OWNER_ID(1)}></Button> */}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
