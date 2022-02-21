import {
  Button,
  CheckBox,
  Header,
  Icon,
  SafeAreaView,
  Text,
  TextInput,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import styles from "./styles";
import * as functions from '../../../api/APIs';
import * as actions from '../../../store/actions/Login';
import {useDispatch, useSelector} from 'react-redux';
export default function EShipping({ route, navigation }) {
  const items = route.params.items
 // alert(JSON.stringify(items));
  const auth = useSelector(state => state.Login);
  const uData = auth.userData;
  
  const dispatch = useDispatch();
  const getA = async() => {
    result = await functions.Get_Adress_By_USER_ID(uData.USER_ID)
   // alert(JSON.stringify(result))
    dispatch(actions.getAdress(result));
  }

  const { colors } = useTheme();
  const { t } = useTranslation();
  const userAdress = useSelector(state => state.userData.userAdress);
  console.log("MY userAdress " + JSON.stringify(userAdress))
  if(!userAdress[0]){
    useEffect(() => {
     // getA()
    }, [])
 }
  //alert(userAdress.STREET_NAME_ONE)
  console.log("my address : " + JSON.stringify(userAdress[0]?.ADRESS_ID))
  const [street, setStreet] = useState(userAdress[0]?.STREET_NAME_ONE ?userAdress[0].STREET_NAME_ONE : '' );
  const [city, setCity] = useState(userAdress[0]?.STATE ? userAdress[0].STATE : "");
  const [name, setname] = useState(userAdress[0]?.HOST_NAME ?userAdress[0].HOST_NAME : '' );
  const [postCode, setPostCode] = useState(userAdress[0]?.POST_CODE ?userAdress[0].POST_CODE : "");
  const [country, setCountry] = useState(userAdress[0]?.PHONE ? userAdress[0].PHONE : '');
  const [contactName, setContactName] = useState(uData.FIRST_NAME + ' ' + uData.LAST_NAME);
  const [email, setEmail] = useState(uData.EMAIL);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("home"); // home or office
  let handleRedirection = (result) => {
    console.log(result)
    if (result) {
    alert('please check ur internet connection')
    } else {
     // alert('no error')
      return navigation.replace("EPayment",{items:items}) 
    }
  };
  const editAddressHandler = ()=> {
    var address = new Object();
   address.ADRESS_ID= userAdress[0]?.ADRESS_ID; 
    address.HOST_NAME= name; 
    address.USER_ID= uData.USER_ID; 
    address.STREET_NAME_ONE= street; 
    address.STATE= city; 
    address.PHONE= country; 
    address.POST_CODE=postCode;
    functions.Edit_Adress(address).then(({error}) =>
    handleRedirection(error),
  );
  }
  const addAddressHandler = ()=> {
    var address = new Object();
    address.ADRESS_ID= -1 ; 
    address.HOST_NAME= name; 
    address.USER_ID= uData.USER_ID; 
    address.STREET_NAME_ONE= street; 
    address.STATE= city; 
    address.PHONE= country; 
    address.POST_CODE=postCode;
     functions.Edit_Adress(address).then(({error}) =>
     handleRedirection(error),
   );
  }
  const [success] = useState({
    street: true,
    city: true,
    postCode: true,
    country: true,
    contactName: true,
    email: true,
    phone: true,
  });
  const onCheckOut = () => {
    const bookingType = route.params?.bookingType;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      //if address exist
      if(!userAdress[0]){
          if(name.length == 0 || city.length == 0 || street.length == 0 ||postCode.length ==0 ||country.length == 0){
           alert("please fill all the fields")
      }
      else{ 
        addAddressHandler()
      }
      }
       //if address does not  exist
      else{
        if(name.length == 0 || city.length == 0 || street.length == 0 ||postCode.length ==0 ||country.length == 0){
          alert("please fill all the fields")
     }
     else{
      // addAddressHandler()
      editAddressHandler()
     }
      }
     // navigation.navigate("EPayment",{items:items}); 
    }, 500);
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        style={{ flex: 1 }}
      >
        <Header
          title={t("Shipping")}
          renderLeft={() => {
            return (
              <Icon
                name="angle-left"
                size={20}
                color={colors.text}
                enableRTL={true}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}
        >
          <Text headline>{"delivery address".toUpperCase()}</Text>
          <TextInput
            style={{ marginTop: 10 }}
            onChangeText={(text) => setname(text)}
            placeholder={"Host Name"}
            success={success.street}
            value={name}
          />
          <TextInput
            style={{ marginTop: 10 }}
            onChangeText={(text) => setStreet(text)}
            placeholder={"street address"}
            success={success.street}
            value={street}
          />
          <TextInput
            style={{ marginTop: 10 }}
            onChangeText={(text) => setCity(text)}
            placeholder={"city"}
            success={success.city}
            value={city}
          />
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 3.5 }}>
              <TextInput
                onChangeText={(text) => setPostCode(text)}
                keyboardType="numeric"
                placeholder={"post code"}
                success={success.postCode}
                value={postCode}
              />
            </View>
            <View style={styles.inputItem}>
              <TextInput
                onChangeText={(text) => setCountry(text)}
                placeholder={'phone number'}
                success={success.country}
                keyboardType="numeric"
                value={country}
                // icon={
                //   <Icon
                //     name="chevron-down"
                //     size={12}
                //     solid
                //     color={BaseColor.grayColor}
                //   />
                // }
              />
            </View>
          </View>
          {/* <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View
              style={{ flex: 3.5, flexDirection: "row", alignItems: "center" }}
            >
              <CheckBox
                title={t("home")}
                checked={type == "home"}
                onPress={() => setType(type == "home" ? "office" : "home")}
              />
            </View>
            <View
              style={[
                styles.inputItem,
                { flexDirection: "row", alignItems: "center" },
              ]}
            >
              <CheckBox
                title={t("office")}
                checked={type == "office"}
                onPress={() => setType(type == "home" ? "office" : "home")}
              />
            </View>
          </View> */}

          <Text headline semibold style={{ marginTop: 20 }}>
            {t("contact_details").toUpperCase()}
          </Text>
          <TextInput
            style={{ marginTop: 10 }}
            onChangeText={(text) => setContactName(text)}
            placeholder={"contact name"}
            success={success.street}
            value={contactName}
          />
          <TextInput
            style={{ marginTop: 10 }}
            onChangeText={(text) => setEmail(text)}
            placeholder={t("email")}
            success={success.email}
            value={email}
          />
          {/* <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 3 }}>
              <TextInput
                onChangeText={(text) => setPostCode(text)}
                placeholder={t("code")}
                keyboardType="numeric"
                success={success.postCode}
                value={postCode}
              />
            </View>
            <View style={{ flex: 7, marginLeft: 10 }}>
              <TextInput
                onChangeText={(text) => setPhone(text)}
                placeholder={t("phone_number")}
                keyboardType="numeric"
                success={success.phone}
                value={phone}
              />
            </View>
          </View> */}
        </ScrollView>
        <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          <Button
      
            loading={loading}
            full 
            onPress={() => {
              onCheckOut();
            }}
          >
        payment
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
