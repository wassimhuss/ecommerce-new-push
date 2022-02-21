import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {AuthActions} from '@actions';
import {SafeAreaView, View, Text, TextInput, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../utils/colors/Colors';
import STYLES from '../../utils/styles';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import AwesomeButton from 'react-native-really-awesome-button/src/themes/blue';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import * as actions from '../../store/actions/Login';
import * as functions from '../../api/APIs';
const {authentication} = AuthActions;
const SignIn = ({navigation}) => {
  console.disableYellowBox = true;
  const dispatch = useDispatch();
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  console.log(email + '  ' + password);
  // const setvalues =(email,password)=> {
  //     AsyncStorage.setItem('email' ,email)

  // }
  const multiSet = async (email, password) => {
    const firstPair = ['email', email];
    const secondPair = ['password', password];
    try {
      await AsyncStorage.multiSet([firstPair, secondPair]);
    } catch (e) {
      //save error
    }

    console.log('Done.');
  };
  async function Login(ownerID , email, password){
    result = await functions.Get_Authenticate(ownerID,email,password);
    
   // console.error('my result with abed  ' + result)
    if (result != null || result !== undefined) {
      // alert(JSON.stringify(result));
      dispatch(actions.LoginUser(result));
      navigation.navigate('MyTabs');
    // console.error('result from API'+result.My_Result.NAME)
    }
  }
  return (
    <SafeAreaView
      style={{paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', marginTop: 40}}>
          <Text style={{fontWeight: 'bold', fontSize: 22, color: COLORS.dark}}>
            SHOP
          </Text>
          <Text
            style={{fontWeight: 'bold', fontSize: 22, color: COLORS.secondary}}>
            PING
          </Text>
        </View>

        <View style={{marginTop: 30}}>
          <Text style={{fontSize: 27, fontWeight: 'bold', color: COLORS.dark}}>
            Welcome !
          </Text>
          <Text style={{fontSize: 19, fontWeight: 'bold', color: COLORS.light}}>
            Sign in to continue
          </Text>
        </View>

        <View style={{marginTop: 20}}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{email: '', password: ''}}
            onSubmit={values => {
              multiSet(values.email, values.password);
              // dispatch(
              //   authentication(true, response => {
              //     if (response.success) {
              //       navigation.navigate('MyTabs');
              //     } else {
              //       //setLoading(false);
              //     }
              //   }),
              // );
              Login(1,values.email, values.password)
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              touched,
              values,
              errors,
              isValid,
            }) => (
              <>
                <View style={{marginTop: 20}}>
                  <View style={STYLES.inputContainer}>
                    <Icon
                      name="mail-outline"
                      color={COLORS.gray}
                      size={20}
                      style={STYLES.inputIcon}
                    />
                    <TextInput
                      name="email"
                      placeholder="Email Address"
                      style={STYLES.input}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      keyboardType="email-address"
                    />
                    {errors.email && touched.email ? (
                      <Text style={{fontSize: 10, color: 'red'}}>
                        {errors.email}
                      </Text>
                    ) : null}
                  </View>
                  <View style={STYLES.inputContainer}>
                    <Icon
                      name="lock-outline"
                      color={COLORS.gray}
                      size={20}
                      style={STYLES.inputIcon}
                    />
                    <TextInput
                      name="password"
                      placeholder="Password"
                      style={STYLES.input}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry
                    />
                    {errors.password && touched.password ? (
                      <Text style={{fontSize: 10, color: 'red'}}>
                        {errors.password}
                      </Text>
                    ) : null}
                  </View>
                  <View style={{marginTop: 20}}>
                    <AwesomeButton
                      // progressLoadingTime={5000}
                      disabled={values.email == 0 || !isValid ? true : false}
                      textSize={18}
                      width="100%"
                      progress
                      onPress={next => {
                        /** Do Something **/
                        setTimeout(() => {
                          handleSubmit();
                          next();
                        }, 2000);
                      }}>
                      SIGN IN
                    </AwesomeButton>
                  </View>
                </View>
              </>
            )}
          </Formik>

          {/* <View style={STYLES.btnPrimary}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
              Sign In
            </Text>
          </View> */}
          {/* <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={STYLES.line}></View>
            <Text style={{marginHorizontal: 5, fontWeight: 'bold'}}>OR</Text>
            <View style={STYLES.line}></View>
          </View> */}
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={STYLES.btnSecondary}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                Sign in with
              </Text>
              <Image
                style={STYLES.btnImage}
                source={require('../../utils/images/facebook.png')}
              />
            </View>
            <View style={{width: 10}}></View>
            <View style={STYLES.btnSecondary}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                Sign in with
              </Text>
              <Image
                style={STYLES.btnImage}
                source={require('../../utils/images/google.png')}
              />
            </View>
          </View> */}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginTop: 40,
            marginBottom: 20,
          }}>
          <Text style={{color: COLORS.light, fontWeight: 'bold'}}>
            Don`t have an account ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{color: COLORS.pink, fontWeight: 'bold'}}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
