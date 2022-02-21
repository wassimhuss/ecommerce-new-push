import {
  Button,
  Header,
  Icon,
  MonthYearPicker,
  PaymentOptions,
  ProductPaymentBankItemActive,
  SafeAreaView,
  Text,
  TextInput,
} from '@components';
import {BaseStyle, useTheme} from '@config';
import {Banks, MobileWallet, PaymentItems} from '@data/ePayment';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as functions from '../../../api/APIs';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  ScrollView,
  Switch,
  UIManager,
  View,
  Alert 
} from 'react-native';
import styles from './styles';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function EPayment({route, navigation}) {
  const confirm = () =>
  Alert.alert(
    "Purchase ! ",
    "do you want to proceed ? ",
    [
      {
        text: " no Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "purchase", onPress: () => 
     feturaHandler() 
     
      
    }
    ]
  );
  const auth = useSelector(state => state.Login);
  const userId = auth.userData.USER_ID;
  //console.error(uData)
  const feturaHandler = async ()=> {
    var fetura = new Object();
    fetura.USER_ID=userId; 
    fetura.OWNER_ID= 1; 
    fetura.PRODUCTS= items; 
    //fetura.USER_ACCOUNT_ID= 2; 
     functions.Feetoura(fetura).then(({error}) =>
     handleRedirection(error),
   );
   // dispatch(actions.EditUser(u))
  } 
  let handleRedirection = (result) => {
    //console.log(result)
    if (result) {
    alert('please check ur internet connection')
    } else {
     // alert('no error')
      return navigation.replace('EConfirmed',{items:items});
    }
  };
  const items = route.params.items
 console.log("my items " + JSON.stringify(items))
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [bankName, setBankName] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(PaymentItems[0]);
  const [card, setCard] = useState('');
  const [isSave, setIsSave] = useState(false);
  const [digit, setDigit] = useState('');
  const [name, setName] = useState('');
  const [domesticCard, setDomesticCard] = useState(Banks[0]);
  const [wallet, setWallet] = useState(MobileWallet[0]);
  const [success] = useState({
    bankName: true,
    card: true,
    valid: true,
    digit: true,
    name: true,
  });

  /**
   *
   * Called when process checkout
   */
  const onCheckOut = () => {
    const bookingType = route.params?.bookingType;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      confirm()
      // feturaHandler()
      // navigation.replace('EConfirmed',{items:items});
    }, 500);
  };

  const onChangType = item => {
    setType(item);
  };

  const renderType = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    switch (type.id) {
      case 1:
        return (
          <>
            {/* <TextInput
              onChangeText={(text) => setBankName(text)}
              placeholder={t("select_bank")}
              success={success.street}
              value={bankName}
            /> */}
            <View style={{marginTop: 20}}>
              {/* <FlatList
                scrollEnabled={false}
                // contentContainerStyle={styles.paddingFlatList}
                data={Banks}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View style={{ flex: 1, padding: 4 }}>
                    <ProductPaymentBankItemActive
                      title={item.title}
                      image={item.image}
                      isActive={domesticCard.id == item.id}
                      onPress={() => setDomesticCard(item)}
                    />
                  </View>
                )}
              /> */}
            </View>
          </>
        );
      case 2:
        return (
          <>
            <Text headline bold style={{textTransform: 'uppercase'}}>
              {t('credit_card_information')}
            </Text>
            <TextInput
              style={{marginTop: 10}}
              onChangeText={text => setName(text)}
              placeholder={t('name_on_card')}
              success={success.name}
              value={name}
            />
            <TextInput
              style={{marginTop: 10}}
              onChangeText={text => setCard(text)}
              placeholder={t('credit_card_number')}
              success={success.card}
              keyboardType="numeric"
              value={card}
            />
            <MonthYearPicker style={{marginTop: 10}} onChange={() => {}} />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <View style={{flex: 3.5}}>
                <TextInput
                  onChangeText={text => setDigit(text)}
                  placeholder={t('digit_num')}
                  success={success.digit}
                  keyboardType="numeric"
                  value={digit}
                />
              </View>
              <View style={styles.digiNumber}>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                  <Switch
                    onValueChange={() => setIsSave(isSave => !isSave)}
                    value={isSave}
                  />
                  <Text style={{marginLeft: 8}} body1>
                    {t('save')}
                  </Text>
                </View>
              </View>
            </View>
          </>
        );
      case 3:
        return (
          <>
            <Text body1>
              A secured browser will be lauched that provides additional
              security for banking transaction, credit card number and other
              sensitive personal data
            </Text>
          </>
        );

      case 4:
        return (
          <>
            <Text headline bold style={{textTransform: 'uppercase'}}>
              {t('select_mobile_wallet')}
            </Text>
            <View style={{marginTop: 20}}>
              <FlatList
                scrollEnabled={false}
                // contentContainerStyle={styles.paddingFlatList}
                data={MobileWallet}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <View style={{flex: 1, padding: 4}}>
                    <ProductPaymentBankItemActive
                      title={item.title}
                      image={item.image}
                      isActive={wallet.id == item.id}
                      onPress={() => setWallet(item)}
                    />
                  </View>
                )}
              />
            </View>
          </>
        );
      default:
        return null;
    }
  };

  const renderButton = () => {
    switch (type.id) {
      case 1:
      case 2:
        return (
          <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
            <Button
              loading={loading}
              full
              onPress={() => {
               onCheckOut();
               //confirm()

              }}>
            Purchase
            </Button>
          </View>
        );
      case 3:
      case 4:
        return (
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 15,
              flexDirection: 'row',
            }}>
            <View style={{flex: 1, paddingRight: 8}}>
              <Button
                style={{backgroundColor: colors.primaryLight}}
                onPress={() => {
                  navigation.goBack();
                }}>
                {t('cancel')}
              </Button>
            </View>
            <View style={{flex: 1, paddingLeft: 8}}>
              <Button
                loading={loading}
                onPress={() => {
                  onCheckOut();
                }}>
                {t('proceed')}
              </Button>
            </View>
          </View>
        );
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        style={{flex: 1}}>
        <Header
          title={t('Payment')}
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

        <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
          <PaymentOptions
            itemInit={PaymentItems[0]}
            data={PaymentItems}
            onChange={item => onChangType(item)}
          />

          <View style={{marginTop: 20}}>{renderType()}</View>
        </ScrollView>
        {renderButton()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
