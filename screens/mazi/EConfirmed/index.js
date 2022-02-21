import {
  Button,
  ProductCard2,
  Icon,
  SafeAreaView,
  Text,
  Header,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { Products } from "@data/eConfirmed";
import React, { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useTranslation } from "react-i18next";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import styles from "./styles";
import * as actions from '../../../store/actions/cart';
export default function EConfirmed({ route, navigation }) {
  const items = route.params.items
  //alert(JSON.stringify(items))
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [bankName, setBankName] = useState("");
  const [loading, setLoading] = useState(false);

  const [success] = useState({
    bankName: true,
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
      //navigation.navigate("EMyOrder");
      dispatch(actions.ClearCart());
      navigation.navigate("Home");
    }, 500);
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        style={{ flex: 1 }}
      >
        <Header
          title={t("completed")}
          // renderLeft={() => {
          //   return (
          //     <Icon
          //       name="angle-left"
          //       size={20}
          //       color={colors.text}
          //       enableRTL={true}
          //     />
          //   );
          // }}
          // onPressLeft={() => {
          //   navigation.goBack();
          // }}
        />

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          <View
            style={[styles.headerView, { borderBottomColor: colors.border }]}
          >
            <View
              style={[
                styles.viewCart,
                {
                  backgroundColor: colors.primary,
                },
              ]}
            >
              <Icon
                name={"cart-plus"}
                style={{ fontSize: 32, color: BaseColor.whiteColor }}
              />
            </View>
            <Text
              headline
              bold
              style={{ textTransform: "uppercase", marginBottom: 10 }}
            >
              Thanks for shopping!
            </Text>
            <Text body2 light>
              We have received your ordered and getting it ready to be shipped.
              We will notify you when it’s on it’s way!
            </Text>

            <Text
              headline
              bold
              style={{ textTransform: "uppercase", marginTop: 30 }}
            >
              Estimated dilivery
            </Text>
            <Text body1 light style={{ marginTop: 4 }}>
              29 July 2020
            </Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <FlatList
              scrollEnabled={false}
              // contentContainerStyle={styles.paddingFlatList}
              data={items}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={{ flex: 1, padding: 4 }}>
                  <ProductCard2
                    title={item.productTitle}
                    description={item.DESCRIPTION}
                    image={item.IMAGE}
                    salePrice={item.productPrice}
                    secondDescription={item.DESCRIPTION}
                    //color={item.color}
                    //size={item.size}
                    quantity={item.QUANTITY}
                  />
                </View>
              )}
            />
          </View>
        </ScrollView>
        <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          <Button
            loading={loading}
            full
            onPress={() => {
              onCheckOut();
            }}
          >
            {'Back Home'}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
