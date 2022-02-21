import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as functions from '../../api/APIs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../utils/colors/Colors';
import STYLES from '../../utils/styles';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import AwesomeButton from 'react-native-really-awesome-button/src/themes/blue';
import CustomInput from '../../components/CustomInput';
import DropDownPicker from '../../components/DropDownPicker';
import Header from '../../components/Header';
import CustomInput2 from '../../components/CustomInput2';
import Custombutton from '../../components/Custombutton';
import {useDispatch} from 'react-redux';
import * as actions from '../../store/actions/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import {Formik} from 'formik';
const SignUp = ({navigation}) => {
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
    firstName: yup.string().required('firstName is required'),
    lastName: yup.string().required('lastname is required'),
   // address: yup.string().required('address is required'),
    phone: yup
      .string()
      .min(8, ({min}) => `phoneNumber must be at least ${min} characters`)
      .required('phoneNumber is required'),
    password2: yup.string().when('password', {
      is: val => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref('password')], 'Both password need to be the same'),
    }),
  });
  let goback = () => {
    navigation.goBack();
  };
  const AddUserHandler = async( Email , firstname , lastname, phone , password)=> {
    var User = new Object();
    User.USER_ID= -1 ; 
    User.USERNAME= 'USERNAME123'; 
    User.EMAIL= Email; 
    User.FIRST_NAME= firstname; 
    User.LAST_NAME= lastname; 
    User.PHONE=phone;
    User.PASSWORD= password;
    User.IS_ACTIVE= true
    User.USER_TYPE_CODE= 2
   // console.warn(JSON.stringify(uData));
   result = await functions.Add_User(User)
   dispatch(actions.Register(result))
  // alert(JSON.stringify(result.success))  
    if (result.success) {
   //alert(JSON.stringify(result.error));
   navigation.navigate('MyTabs')
  }
  // else{
  //   navigation.navigate('MyTabs');
  // }
  }
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
  return (
    <SafeAreaView>
      <Header title="Register" goback={goback} />
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{
          firstName: '',
          lastName: '',
          //address: '',
          phone: '',
          email: '',
          password: '',
          password2: '',
        }}
        onSubmit={values => {
          multiSet(values.email, values.password);
          AddUserHandler(values.email,values.firstName,values.lastName,values.phone,values.password)
         // navigation.navigate('MyTabs');
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
          <ScrollView style={{height: '100%', backgroundColor: '#DCDCDC'}}>
            <Text
              style={{
                color: 'black',
                marginLeft: 10,
                marginTop: 20,
                fontSize: 13,
              }}>
              PERSONAL INFORMATION
            </Text>

            <View style={{marginTop: 10, backgroundColor: 'white'}}>
              <CustomInput2
                title="First Name"
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                err={errors.firstName}
                errtouch={touched.firstName}
              />
              <CustomInput2
                title="Last Name"
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                err={errors.lastName}
                errtouch={touched.lastName}
              />

              <CustomInput
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                err={errors.phone}
                errtouch={touched.phone}
              />
              {/* <DropDownPicker /> */}
              {/* <TextInput
                value={values.address}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                placeholder="Address : Street,  building,  floor .."
                style={{
                  width: '100%',
                  color: 'black',
                  fontSize: 14,
                  height: 44,
                  marginLeft: 10,
                  // position: 'relative',
                }}
              />
            </View>
            {errors.address && touched.address ? (
              <Text style={{fontSize: 11, color: 'red'}}>{errors.address}</Text>
            ) : null}
            <View> */}
             

            <View style={{marginTop: 10, backgroundColor: 'white'}}>
            {/* <Text
                style={{
                  color: 'black',
                  marginLeft: 10,
                  marginTop: 20,
                  fontSize: 13,
                }}>
                ACCOUNT INFORMATION
              </Text> */}
            </View>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'height' : 'height'}>
                <View>
                  <CustomInput2
                    err={errors.email}
                    errtouch={touched.email}
                    title="Email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                  {/* {errors.email && touched.email ? (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.email}
                    </Text>
                  ) : null} */}
                  <CustomInput2
                    err={errors.password}
                    errtouch={touched.password}
                    title="Password"
                    type="password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                  />
                  <CustomInput2
                    err={errors.password2}
                    errtouch={touched.password2}
                    title="Confirm Password"
                    type="password"
                    value={values.password2}
                    onChangeText={handleChange('password2')}
                    onBlur={handleBlur('password2')}
                  />
                </View>
              </KeyboardAvoidingView>
            </View>
            <View style={{marginHorizontal: 30, marginVertical: 20}}>
              <AwesomeButton
                height={45}
                // progressLoadingTime={5000}
                disabled={values.password2 == 0 || !isValid ? true : false}
                //disabled={!isValid}
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
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default SignUp;
