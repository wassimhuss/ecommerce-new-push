import {
  Button,
  CardBooking,
  Header,
  Icon,
  ModalFilter,
  ProductCard1,
  SafeAreaView,
  TextInput,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { ProductsData } from "@data";
import React, { Fragment, useEffect, useState } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { useTranslation } from "react-i18next";
import * as actions from '../../../store/actions/Login';
import { FlatList, RefreshControl, View, StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as functions from '../../../api/APIs';
const sortOptionInit = [
  {
    value: "remove",
    icon: "sort-amount-up",
    text: "remove",
  },
  {
    value: "share_this_article",
    icon: "sort-amount-down",
    text: "share_this_article",
  },
  {
    value: "view_detail",
    icon: "sort-amount-up",
    text: "view_detail",
  },
  {
    value: "reset_all",
    icon: "sort-amount-up",
    text: "reset_all",
  },
];

const Favourite = (props) => {
   const dispatch =useDispatch()
  const { navigation, route } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState(ProductsData);
   //const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState(sortOptionInit);
  const items = route.params.item
  console.log("my items "  + JSON.stringify(items))
  const feturaHandler = async ()=> {
    var fetura = new Object();
    fetura.USER_ID= 1; 
    fetura.OWNER_ID= 1; 
    fetura.PRODUCTS= items; 
    fetura.USER_ACCOUNT_ID= 2; 
     functions.Feetoura(fetura) 
   // dispatch(actions.EditUser(u))
  } 
  const auth = useSelector(state => state.Login);
  const uData = auth.userData;
  const getA = async() => {
    result = await functions.Get_Adress_By_USER_ID(uData.USER_ID)
   // alert(JSON.stringify(result))
   dispatch(actions.getAdress(result));
  }
  //console.log('wowwwww ' + items)
  const [promotionCode, setPromotionCode] = useState("");
    useEffect(() => {
      getA()
    }, [])
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, Math.floor(Math.random() * 1000) + 1000);
  }, []);

  const onSelectFilter = (selected) => {
    setSortOption(
      sortOption.map((item) => {
        return {
          ...item,
          checked: item.value == selected.value,
        };
      })
    );
  };

  const onApply = () => {
    let itemSelected = null;
    for (const item of sortOption) {
      if (item.checked) {
        itemSelected = item;
      }
    }
    if (itemSelected) {
      setModalVisible(false);
      setSortOption(sortOptionInit);
    }
  };

  const renderPlaceholder = () => {
    let holders = Array.from(Array(10));
    let y = 0;
    let height = 60;

    return (
      <View style={BaseStyle.container}>
        <ContentLoader
          speed={0.5}
          width={"100%"}
          height={"100%"}
          backgroundColor="#f3f3f3"
          foregroundColor={BaseColor.dividerColor}
        >
          <Rect x="0" y="0" rx="8" ry="8" width="40%" height="30" />

          {holders.map((item, index) => {
            y = index == 0 ? height : y + height + 20;
            return (
              <Fragment key={index}>
                <Rect x="0" y={y} rx="8" ry="8" width="60" height={height} />
                <Rect x="70" y={y + 5} rx="8" ry="8" width="80%" height={10} />
                <Rect x="70" y={y + 25} rx="8" ry="8" width="40%" height={10} />
                <Rect x="70" y={y + 45} rx="8" ry="8" width="20%" height={10} />
              </Fragment>
            );
          })}
        </ContentLoader>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={t("checkout")}
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
        <View style={[{ flex: 1, paddingHorizontal: 20, paddingBottom: 10 }]}>
          {/* <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <TextInput
              style={{ flex: 1 }}
              onChangeText={(text) => setPromotionCode(text)}
              autoCorrect={false}
              placeholder={t("promotion_code")}
              placeholderTextColor={BaseColor.grayColor}
              value={promotionCode}
              selectionColor={colors.primary}
              onSubmitEditing={() => {
                navigation.goBack();
              }}
            />
            <Button small style={{ height: 45, marginLeft: 8 }}>
              {t("check")}
            </Button>
          </View> */}

          <FlatList
            // contentContainerStyle={{ paddingVertical: 12 }}
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                colors={[colors.primary]}
                tintColor={colors.primary}
                refreshing={refreshing}
                onRefresh={() => {}}
              />
            }
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <ProductCard1
                style={{ marginTop: 10 }}
                title={item.productTitle}
                image={item.IMAGE}
                salePrice={"$"+item.productPrice+".00 x " + item.QUANTITY }
                fullPrice ={item.productPrice*item.QUANTITY}
                description={item.DESCRIPTION}
                secondDescription={item.secondDescription}
                onDelete={() =>
                  setProducts(
                    products.filter((product) => product.id != item.id)
                  )
                }
                onChange={(total) => console.log("total", total)}
              />
            )}
          />

          <ModalFilter
            options={sortOption}
            isVisible={modalVisible}
            onSwipeComplete={() => {
              setModalVisible(false);
              setSortOption(sortOptionInit);
            }}
            onApply={onApply}
            onSelectFilter={onSelectFilter}
          />
        </View>
        <CardBooking
          style={{}}
          description={"total price"}
          price={ '$' +items[0].total+ ',00' }
          secondDescription={"Tax included"}
          textButton={t("checkout")}
          onPress={() => 
            //feturaHandler()
            navigation.navigate("EShipping",{items:items})
          }
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      {loading ? renderPlaceholder() : renderContent()}
    </SafeAreaView>
  );
};

export default Favourite;
