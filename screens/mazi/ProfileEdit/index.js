import {
  Button,
  Header,
  Icon,
  Image,
  SafeAreaView,
  Text,
  TextInput,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
// Load sample data
import {useDispatch, useSelector} from 'react-redux';
import { UserData } from "@data";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import * as functions from '../../../api/APIs';
import * as actions from '../../../store/actions/Login';
const ProfileEdit = (props) => {
  const auth = useSelector(state => state.Login);
  const uData = auth.userData;
  
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [id, setId] = useState(UserData[0].id);
  const [name, setName] = useState(uData.USERNAME);
  const [firstName, setfirstName] = useState(uData.FIRST_NAME);
  const [LastName, setLastName] = useState(uData.LAST_NAME);
  const [email, setEmail] = useState(uData.EMAIL);
  const [phone, setphone] = useState(uData.PHONE);
  const [image, setImage] = useState(UserData[0].image);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const editAddressHandler = async ()=> {
    var user = new Object();
    user.USER_ID= uData.USER_ID; 
    user.USERNAME= name; 
    user.EMAIL= email; 
    user.FIRST_NAME= firstName; 
    user.LAST_NAME= LastName; 
    user.PHONE=phone;
    user.USER_TYPE_CODE=2;
    user.IS_ACTIVE=true;
    user.PASSWORD=uData.PASSWORD;
    let u = await functions.Edit_User(user) 
    dispatch(actions.EditUser(u))
  }
  let go =()=>{
    editAddressHandler()
    navigation.goBack()
  }
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <Header
        title={t("edit_profile")}
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {}}
      />
      <ScrollView>
        <View style={styles.contain}>
          {/* <View>
            <Image source={image} style={styles.thumb} />
          </View> */}
          {/* <View style={styles.contentTitle}>
            <Text headline semibold>
              {t("account")}
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={(text) => setId(text)}
            autoCorrect={false}
            placeholder={t("input_id")}
            placeholderTextColor={BaseColor.grayColor}
            value={id}
            selectionColor={colors.primary}
          /> */}
          <View style={styles.contentTitle}>
            <Text headline semibold>
              {'firstName'}
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={(text) => setfirstName(text)}
            autoCorrect={false}
            placeholder={'firstName'}
            placeholderTextColor={BaseColor.grayColor}
            value={firstName}
            selectionColor={colors.primary}
          />
          <View style={styles.contentTitle}>
            <Text headline semibold>
              {'LastName'}
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={(text) => setLastName(text)}
            autoCorrect={false}
            placeholder={'LastName'}
            placeholderTextColor={BaseColor.grayColor}
            value={LastName}
            selectionColor={colors.primary}
          />
          <View style={styles.contentTitle}>
            <Text headline semibold>
              {'username'}
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={(text) => setName(text)}
            autoCorrect={false}
            placeholder={'username'}
            placeholderTextColor={BaseColor.grayColor}
            value={name}
            selectionColor={colors.primary}
          />
          <View style={styles.contentTitle}>
            <Text headline semibold>
              {t("email")}
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={(text) => setEmail(text)}
            autoCorrect={false}
            placeholder={t("input_email")}
            placeholderTextColor={BaseColor.grayColor}
            value={email}
          />
          <View style={styles.contentTitle}>
            <Text headline semibold>
              {'phone Number'}
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={(text) => setphone(text)}
            autoCorrect={false}
            placeholder={t("input_address")}
            placeholderTextColor={BaseColor.grayColor}
            value={phone}
            selectionColor={colors.primary}
          />
        </View>
      </ScrollView>
      <View style={{ padding: 20 }}>
        <Button
          loading={loading}
          full
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              go();
            }, 500);
          }}
        >
          {t("confirm")}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ProfileEdit;
