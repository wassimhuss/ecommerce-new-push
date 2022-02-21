import { Header, Icon, SafeAreaView, Tag, Text, TextInput } from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as functions from '../../../api/APIs';
import LottieView from 'lottie-react-native';
import * as actions from '../../../store/actions/Login';
import {useDispatch, useSelector} from 'react-redux';
import {
  ActivityIndicator,
  Keyboard,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";

const searchHistoryInit = [
  { id: "1", keyword: "BodySuit" },
  { id: "2", keyword: "Jean" },
  { id: "3", keyword: "Joggers" },
  { id: "4", keyword: "T-Shirt" },
  { id: "5", keyword: "Swimear" },
  { id: "6", keyword: "Underwear" },
];

const popularKewordInit = [
  { id: "1", keyword: "ASOS" },
  { id: "2", keyword: "Nike" },
  { id: "3", keyword: "Adidas" },
  { id: "4", keyword: "Fila" },
  { id: "5", keyword: "Calvin Klein" },
  { id: "6", keyword: "Fred Perry" },
];

const SearchHistory = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState(searchHistoryInit);
  const [popularKeword, setPopularKeword] = useState(popularKewordInit);
  const [searchProduct, setsearchProduct] = useState('');
  const[holder ,setHolder]=useState(false)
  console.log(JSON.stringify(searchProduct.products))
  const onSearch =async (keyword) => {
    //alert(keyword)
    setHolder(true)
      result = await functions.Get_Product_By_Search(keyword)
      //setsearchProduct(result)
      if(result){
        //dispatch(actions.search(result));
        navigation.navigate("EProduct",{products:result})
        setTimeout(() => {
          setHolder(false)
        }, 4000);
      }
       
        // if(searchProduct.products){
        //   navigation.navigate("EProduct",{products:searchProduct.products})
        // }
     // alert(JSON.stringify(result))
      //dispatch(actions.getAdress(result));
   
    // const found = searchHistory.some((item) => item.keyword == keyword);
    // let searchData = [];

    // if (found) {
    //   searchData = searchHistory.map((item) => {
    //     return {
    //       ...item,
    //       checked: item.keyword == keyword,
    //     };
    //   });
    // } else {
    //   searchData = searchHistory.concat({
    //     keyword: search,
    //   });
    // }
    // setSearch(keyword);
    // setSearchHistory(searchData);
    // setLoading(true);
    // setTimeout(() => navigation.navigate("EProduct"), 1000);
  };

  const onPopularKeyword = (keyword) => {
    setSearch(keyword);
    setLoading(true);
    setTimeout(() => navigation.navigate("EProduct"), 1000);
  };

  const onSearchBarcode = () => {
    Keyboard.dismiss();
    navigation.navigate("ESearchBarcode");
  };

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView]}
      forceInset={{ top: "always" }}
    >
      <Header
        title={t("search")}
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
        renderRight={() => {
          if (loading) {
            return <ActivityIndicator size="small" color={colors.primary} />;
          } else {
            return (
              <TouchableOpacity onPress={() => onSearch(search)}>
                <Text header headline primaryColor>
                  {t("apply")}
                </Text>
              </TouchableOpacity>
            );
          }
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={{ padding: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1, paddingRight: 12 }}>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => setSearch(text)}
              autoCorrect={false}
              placeholder={"enter keywords"}
              placeholderTextColor={BaseColor.grayColor}
              value={search}
              selectionColor={colors.primary}
              onSubmitEditing={() => {
                onSearch(search);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setSearch("");
              }}
              style={styles.btnClearSearch}
            >
              <Icon name="times" size={18} color={BaseColor.grayColor} />
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
            style={{
              backgroundColor: colors.card,
              padding: 7,
              borderRadius: 4,
            }}
            onPress={onSearchBarcode}
          >
            <Icon name="qrcode" size={30} color={BaseColor.grayColor} />
          </TouchableOpacity> */}
        </View>
        
        {/* <View style={{ marginTop: 30 }}>
          <View style={styles.rowTitle}>
            <Text title3 semibold>
              {t("search_history")}
            </Text>
            <TouchableOpacity onPress={() => setSearchHistory([])}>
              <Text caption1 accentColor>
                {t("clear")}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {searchHistory.map((item, index) => (
              <Tag
                key={item.id}
                primary={item.checked}
                outline={!item.checked}
                style={{
                  marginTop: 8,
                  marginRight: 8,
                  height: 28,
                }}
                onPress={() => onSearch(item.keyword)}
              >
                {item.keyword}
              </Tag>
            ))}
          </View>
        </View> */}
        {/* <View style={{ marginTop: 30 }}>
          <View style={styles.rowTitle}>
            <Text title3 semibold>
            popular keyword
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {popularKeword.map((item, index) => (
              <Tag
                key={item.id}
                primary
                outline
                gray
                style={{
                  marginTop: 8,
                  marginRight: 8,
                  height: 28,
                  backgroundColor: colors.background,
                }}
                onPress={() => onPopularKeyword(item.keyword)}
                textStyle={{
                  color: colors.text,
                }}
              >
                {item.keyword}
              </Tag>
            ))}
          </View>
        </View> */}
      </View>
      {holder ? 
       <View style={{width:"100%", height:"100%" ,alignItems:"center"}}>
       <LottieView source={require('../../../utils/images/77218-search-imm.json')} autoPlay loop  style={{width: 300, height: 300}}/>
       </View> 
       : 
       null
    }
     
    </SafeAreaView>
  );
};

export default SearchHistory;
