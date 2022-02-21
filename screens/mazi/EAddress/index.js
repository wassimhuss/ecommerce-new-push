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
import { EAddressData } from "@data";
import React, { useState ,useEffect} from "react";
import { useTranslation } from "react-i18next";
import * as functions from '../../../api/APIs';
import * as actions from '../../../store/actions/Login';
import {useDispatch, useSelector} from 'react-redux';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import styles from "./styles";
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AddressItem = ({
  style,
  isSelected = true,
  name = "",
  address = "",
  phone = "",
  addressIDW,
  getAddress,
  onEdit = () => {},
  onPress = () => {},
}) => {
  const { colors } = useTheme();
 
  return (
    <TouchableOpacity
      style={[
        {
          padding: 12,
          borderRadius: 8,
          backgroundColor: isSelected ? colors.primary : colors.backgroundColor,
          borderWidth: isSelected ? 0 : StyleSheet.hairlineWidth,
          borderColor: colors.border,
        },
        style,
      ]}
      onPress={onPress}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text headline whiteColor={isSelected} style={{ flex: 1 }}>
          {name}
        </Text>
        <TouchableOpacity
          onPress={onEdit}
          hitSlop={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <Icon
            name="edit"
            style={{
              color: isSelected ? BaseColor.whiteColor : colors.text,
            }}
          />
        </TouchableOpacity>
      </View>
      <Text
        body2
        whiteColor={isSelected}
        style={{ marginBottom: 4, marginTop: 6 }}
      >
        {address}
      </Text>
      <Text headline whiteColor={isSelected}>
        {phone}
      </Text>
    </TouchableOpacity>
  );
};


const EAddress = (props) => {
  useEffect(() => {
    getA()
  }, [])
  const auth = useSelector(state => state.Login);
  const uAdress = auth.address;
  const uData = auth.userData;
  const userData = useSelector(state => state.userData.userAdress);
 // alert(JSON.stringify(userData))
 //
  //alert(userData)
  const { navigation } = props;
  const dispatch = useDispatch();
  const getA = async() => {
    result = await functions.Get_Adress_By_USER_ID(uData.USER_ID)
   // alert(JSON.stringify(result))
    dispatch(actions.getAdress(result));
  }
  
  const { t } = useTranslation();
  const [Type , SetType]= useState();
  //alert(Type)
  const { colors } = useTheme();
  const [address, setAddress] = useState(uAdress[0]);
  const [repassword, setRepassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState(EAddressData);
  const [refreshing, setRefreshing] = useState(false);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [country, setCountry] = useState("");
  const [type, setType] = useState("home"); // home or office
  const [add, setAdd] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addresId,SetAdressID]=useState();
   //alert(addresId)
  const [success] = useState({
    street: true,
    city: true,
    postCode: true,
    country: true,
    contactName: true,
    email: true,
    phone: true,
  });
    let getAddress =(X)=>{
      SetAdressID(X)
    }
  const onAdd = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAdd(!add);
  };

  const onEdit = (item) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAdd(true);
    setName(item.HOST_NAME);
    setPhone(item.PHONE);
    setStreet(item.STREET_NAME_ONE);
    setCity(item.STATE);
    setPostCode(item.POST_CODE);
    SetAdressID(item.ADRESS_ID)
    setCountry();
  };
  const editAddressHandler = ()=> {
    var address = new Object();
    address.ADRESS_ID= addresId; 
    address.HOST_NAME= name; 
    address.USER_ID= uData.USER_ID; 
    address.STREET_NAME_ONE= street; 
    address.STATE= city; 
    address.PHONE= phone; 
    address.POST_CODE=postCode;
   // console.warn(JSON.stringify(uData));
     functions.Edit_Adress(address)
  }
const addAddressHandler = ()=> {
  var address = new Object();
  address.ADRESS_ID= -1 ; 
  address.HOST_NAME= name; 
  address.USER_ID= uData.USER_ID; 
  address.STREET_NAME_ONE= street; 
  address.STATE= city; 
  address.PHONE= phone; 
  address.POST_CODE=postCode;
   functions.Edit_Adress(address)
}
function go(){
  if(name.length == 0 || city.length == 0 || street.length == 0 ||postCode.length ==0 ||phone.length == 0){
    alert('please fill all fields')
  }else{
    addAddressHandler();
    navigation.goBack()
  }
  
}
let go2 =()=> { 
  editAddressHandler()
  navigation.goBack()
}
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <Header
        title={t("address")}
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
        renderRight={() =>
          add && (
            <Text body1 style={{ color: colors.primaryDark }}>
              {t("save")}
            </Text>
          )
        }
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => 
        //    {
          Type == 1 ? 
          go(): 
          // go2()
          go2()
        //   //hon sheghel
          // if(Type == 1) { 
          //   go()
          // }
          // else {
          //   go2()
          // }
          

        //  //alert(add)
        //  // go()
        // }
      }
      />
      {!add && (
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={true}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          data={userData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <AddressItem
            getAddress={getAddress}
            //addressIDW={item.ADRESS_ID}
              style={{ marginTop: 10 }}
              name={item.HOST_NAME}
              address={item.STREET_NAME_ONE}
              phone={item.PHONE}
              isSelected={address?.ADRESS_ID == item.ADRESS_ID}
              onPress={() => setAddress(item)}
              onEdit={() => onEdit(item)}
            />
          )}
        />
      )}

      <View style={{ padding: 20 }}>
        <Button
          outline
          loading={loading}
          full
          onPress={() => {
            if(add){
             onAdd() 
             SetType(0) 
            } else{
              onAdd();
              SetType(1)
            }
             
           // onAdd();
          }}
          icon={
            !add && (
              <Icon
                name={"plus"}
                style={{ color: colors.primary, marginHorizontal: 4 }}
              />
            )
          }
        >
          {add ? 'cancel' : "add new"}
        </Button>
      </View>
      {add && (
        <KeyboardAvoidingView behavior={"height"}>
          <ScrollView>
            <View style={{ padding: 20, paddingTop: 0 }}>
              <TextInput
                style={{ marginTop: 10 }}
                onChangeText={(text) => setName(text)}
                placeholder={t("name")}
                success={success.street}
                value={name}
              />
              {/* <TextInput
                style={{ marginTop: 10 }}
                onChangeText={(text) => setPhone(text)}
                placeholder={t("phone_number")}
                success={success.street}
                value={phone}
              /> */}
              <TextInput
                style={{ marginTop: 10, flex: 1 }}
                onChangeText={(text) => setStreet(text)}
                placeholder={t("street_address")}
                success={success.street}
                value={street}
                numberOfLines={6}
                multiline={false}
              />
              <TextInput
                style={{ marginTop: 10 }}
                onChangeText={(text) => setCity(text)}
                placeholder={t("city")}
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
                    onChangeText={(text) => setPhone(text)}
                    keyboardType="numeric"
                    placeholder={'phone Number'}
                    success={success.country}
                    value={phone}
                    icon={
                      <Icon
                        name="phone"
                        size={12}
                        solid
                        color={BaseColor.grayColor}
                      />
                    }
                  />
                </View>
              </View>
              {/* <View style={{ flexDirection: "row", marginTop: 10 }}>
                <View
                  style={{
                    flex: 3.5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
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
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default EAddress;
