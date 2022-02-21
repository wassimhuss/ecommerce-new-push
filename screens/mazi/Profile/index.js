import {AuthActions} from '@actions';
import {
  Button,
  GradientButton,
  Icon,
  ProfileDetail,
  ProfilePerformance,
  SafeAreaView,
  Tag,
  Text,
  SocialBox,
} from '@components';

import {BaseStyle, useTheme} from '@config';
// Load sample data
import {UserData} from '@data';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView,Alert , TouchableOpacity, View, Text as RNText} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as functions from '../../../api/APIs';
import styles from './styles';
import * as actions from '../../../store/actions/Login';
const {authentication} = AuthActions;

const Profile = props => {
  const [net, setnet] = useState(false)
  let handleRedirection = (result) => {
    // console.log(result)
     if (result) {
     alert('please connection')
     setnet(false)
     }
      else {
        setnet(true)
      // alert('no error')
      // return navigation.replace("EPayment",{items:items}) 
     }
   };
   async function checkNet(ownerID){
    result = await functions.CHECKNET(ownerID).then(({error}) =>
    handleRedirection(error)
  );
  }
  useEffect(() => {
    checkNet(1)
    }
  , [])
   const createTwoButtonAlert = () =>
    Alert.alert(
      "Warning ! ",
      "do you want to proceed? ",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "SignOut", onPress: () =>
      dispatch(
      actions.SignUp()
      )
      // authentication(false, response => {
      //   setLoading(false);
      // }),

      }
      ]
    );
  const {colors} = useTheme();3
  const {t} = useTranslation();
  const {navigation} = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(UserData[0]);
  let product = useSelector(state => state.Product)
  // const auth = useSelector(state => state.auth);
  // const login = auth.login.success;
  const auth = useSelector(state => state.Login);
  const login = auth.success;
  const uData = auth.userData;
  const uAdress = auth.address;
  //console.error('uAdress' + JSON.stringify(uAdress));
  const onLogOut = () => {
   // setLoading(true);
  //  alert('hello')
  createTwoButtonAlert()
    // dispatch(3
    //   actions.SignUp()
    //   // authentication(false, response => {
    //   //   setLoading(false);
    //   // }),
    // )
  };

  const onLogIn = () => {
    navigation.navigate('SignIn');
  };

  const styleItem = {
    ...styles.profileItem,
    borderBottomColor: colors.border,
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <View style={[BaseStyle.container, {flex: 1}]}>
        <View style={{marginBottom: 20}}>
          <Text header bold>
            {t('Settings')}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            {login && (
              <ProfileDetail
               // image={userData.image}
                textFirst={uData.FIRST_NAME + ' ' + uData.LAST_NAME}
               // point={userData.point}
                textSecond={uData.EMAIL}
                textThird={'nb : '+uData.PHONE}
                onPress={() => {}}
              />
            )}

            <View style={{width: '100%'}}>
              {login && (
                <TouchableOpacity
                  style={styleItem}
                  onPress={() => {
                    navigation.navigate('ProfileEdit');
                  }}>
                  <Text body1>edit profile</Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={colors.primary}
                    style={{marginLeft: 5}}
                    enableRTL={true}
                  />
                </TouchableOpacity>
              )}
            
              {login && (
                <TouchableOpacity
                  style={styleItem}
                  onPress={() => {
                    navigation.navigate('EAddress');
                  }}>
                  <Text body1>billing address</Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={colors.primary}
                    style={{marginLeft: 5}}
                    enableRTL={true}
                  />
                </TouchableOpacity>
              )}
              {net?  <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate('AboutUs');
                }}>
                <Text body1>About us</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{marginLeft: 5}}
                  enableRTL={true}
                />
              </TouchableOpacity> : 
               <Text> please check ur net connection</Text>
              }
             
              {/* <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate('AboutUs');
                }}>
                <Text body1>privacy terms</Text>  
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{marginLeft: 5}}
                  enableRTL={true}
                />
              </TouchableOpacity> */}
            </View>
            {/* <View style={{flexDirection: 'row', marginTop: 20}}>
              <SocialBox name={'facebook'} color={'#4267B2'} />
              <SocialBox name={'instagram'} color={'#EA3E54'} />
            </View> */}
            <View style={{marginTop: 20}}>
              <RNText style={{fontWeight: 'bold', fontSize: 11}}>
                &#169; shoppingApp, All Rights Reserved
              </RNText>
              <RNText style={{fontWeight: 'bold', fontSize: 11}}>
                Developed By wassim ahmad
              </RNText>
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={{padding: 10}}>
        { net? login ? (
          <Button full loading={loading} onPress={() => onLogOut()}>
            sign out
          </Button>
        ) : (
          <GradientButton full loading={loading} onPress={() => onLogIn()}>
            sign in
          </GradientButton>
        ) : null }
        {/* {login ? (
          <Button full loading={loading} onPress={() => onLogOut()}>
            sign out
          </Button>
        ) : (
          <GradientButton full loading={loading} onPress={() => onLogIn()}>
            sign in
          </GradientButton>
        )} */}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
