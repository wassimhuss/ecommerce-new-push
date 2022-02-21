/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import {
  CategoryIconSoft,
  HeaderAnimated,
  Icon,
  Image,
  ModalFilter,
  ProductGrid1,
  SafeAreaView,
  ShopCard1,
  Text,
  TextInput,
  HeaderLargeTitle,
  HeaderLargeTitleStore,
  HeaderLargeTitleBadge,
  ProductOffer,
  Brand,
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
import {ECategories, EFeaturedShop, EPopulars, EYourStores} from '@data';
import {getWidthDevice} from '@utils';
import React, {useEffect, useRef, useState} from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import * as functions from '../../../api/APIs';
import * as actions from '../../../store/actions/product';
import {
  Animated,
  ScrollView,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {SliderBox} from 'react-native-image-slider-box';
import FastImage from 'react-native-fast-image';

const HeaderLine = ({style = {}, title = '', onPress = () => {}}) => {
  const {t} = useTranslation();
 
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
        },
        style,
      ]}>
      <Text title3 style={{flex: 1}}>
        {title}
      </Text>
      {/* <TouchableOpacity onPress={onPress}>
        <Text body2 accentColor>
          {t('see_all')}
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

const Home = props => {
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
  let product = useSelector(state => state.Product)
  let courasel = useSelector(state => state.courasel.courasel)
  let mycouraselURLS=[]

  courasel.forEach(item => {
    // console.log(item.My_URL)
    mycouraselURLS.push(item.My_URL)
   })

 

 // console.log('my courasel : '+ JSON.stringify(courasel))
 // console.log('my products : '+ JSON.stringify(product.AllProducts))
  const {navigation} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState(EYourStores);
  const [storeChoosed, setStoreChoosed] = useState(EYourStores[0]);
  const dispatch = useDispatch();
  const [images, setImages] = useState([
    'https://image.freepik.com/free-vector/digital-marketing-concept-shopping-online-mobile-application_68971-366.jpg',
    'https://image.freepik.com/free-vector/online-shopping-websites-mobile-applications-concepts-digital-marketing-with-smartphone_71208-257.jpg',
    'https://i.pinimg.com/736x/4d/d6/54/4dd65470fd4d41a14f4d4fbc0eda1c37.jpg',
    'https://image.freepik.com/free-photo/online-shopping-mobile-application-3d-rendering_51264-772.jpg',
  ]);
  const scrollY = useRef(new Animated.Value(0)).current;

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: false,
    },
  );
  //  let product = useSelector(state => state.Product);
  // useEffect(() => {
  //   dispatch(actions.GetProduct(1));
  // }, [product]);

  //console.log(product);

  const onChangeStore = () => {
    let storeChoosed = {};
    for (const store of stores) {
      if (store.checked) {
        storeChoosed = store;
        break;
      }
    }
    setStoreChoosed(storeChoosed);
    setModalVisible(false);
  };

  const onSelectStore = store => {
    const stores = EYourStores.map(item => {
      return {
        ...item,
        checked: item.value == store.value,
      };
    });
    setStores(stores);
  };
  console.disableYellowBox = true;
  useEffect(() => {
    product.isRecommended ? 
    setTimeout(() => {
      setLoading(false);
    }, Math.floor(Math.random() * 1000) + 1000) 
    : alert('please check ur intenet connection')
  }, []);

  const goCategory = (item = {}) => {
    navigation.navigate('ECategory', {item: item});
  };

  const goShop = item => {
    navigation.navigate('EProductStoreProfile', {item: item});
  };

  const goProductDetail = item => {
    navigation.navigate('EProductDetail', {item: item});
  };

  const goSearch = () => {
    navigation.navigate('ESearchHistory');
  };

  const goProducts = () => {
    //navigation.navigate('EProduct');
  };

  const renderPlaceholder = () => {
    return (
      <View style={styles.paddingSrollView}>
        <ContentLoader
          speed={0.5}
          width={'100%'}
          height={'100%'}
          backgroundColor="#f3f3f3"
          foregroundColor={BaseColor.dividerColor}>
          <Rect x="0" y="0" rx="8" ry="8" width="40%" height="30" />
          <Rect x="0" y="40" rx="8" ry="8" width="80%" height="20" />
          <Rect x="0" y="80" rx="8" ry="8" width="100%" height={250} />

          <Rect x="0" y={350} rx="8" ry="8" width="110" height={80} />
          <Rect x="120" y={360} rx="8" ry="8" width="30%" height={10} />
          <Rect x="120" y={380} rx="8" ry="8" width="60%" height={15} />
          <Rect x="120" y={410} rx="8" ry="8" width="40%" height={10} />

          <Rect x="0" y={440} rx="8" ry="8" width="110" height={80} />
          <Rect x="120" y={450} rx="8" ry="8" width="30%" height={10} />
          <Rect x="120" y={470} rx="8" ry="8" width="60%" height={15} />
          <Rect x="120" y={495} rx="8" ry="8" width="40%" height={10} />

          <Rect x="0" y={530} rx="8" ry="8" width="110" height={80} />
          <Rect x="120" y={540} rx="8" ry="8" width="30%" height={10} />
          <Rect x="120" y={560} rx="8" ry="8" width="60%" height={15} />
          <Rect x="120" y={585} rx="8" ry="8" width="40%" height={10} />

          <Rect x="0" y={630} rx="8" ry="8" width="50%" height={160} />
          <Rect x="53%" y={630} rx="8" ry="8" width="50%" height={160} />
        </ContentLoader>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <LinearGradient
        colors={[
          BaseColor.mainBlue,
          BaseColor.whiteColor,
          BaseColor.whiteColor,
        ]}
        style={{flex: 1}}>
        <View style={{flex: 1}}>
          <HeaderAnimated
            scrollY={scrollY}
            componentLeft={<HeaderLargeTitleStore />}
            // componentRight={
            //   <HeaderLargeTitleBadge
            //     // onPress={() => 
            //     //   navigation.navigate('ENotification')}
            //   />
            // }
            componentBottom={
              <TouchableOpacity onPress={goSearch}>
                <TextInput
                  autoCorrect={false}
                  placeholder={" search here ! "}
                  value={search}
                  editable={false}
                  pointerEvents="none"
                />
              </TouchableOpacity>
            }
          />

          <Animated.ScrollView
            contentContainerStyle={[styles.paddingSrollView]}
            onScroll={onScroll}>
              { 
                mycouraselURLS !== null &&
                <SliderBox
              ImageComponentStyle={{marginTop: 10}}
              ImageComponent={FastImage}
              images={mycouraselURLS}
              sliderBoxHeight={200}
              autoplay
              circleLoop
              imageLoadingColor="#99ca3c"
              dotColor="#99ca3c"
            /> }
            
            {/* <HeaderLine title={t("categories")} onPress={goCategory} />
  
              <Text subhead style={{ marginTop: 4 }}>
                {t("e_description_featured_shop")}
              </Text> */}
            {/*Not use FlatList in ScrollView */}
            <View style={{padding: 20}}>
              {/* <ScrollView
                contentContainerStyle={styles.paddingFlatList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                {ECategories.map((item, index) => (
                  <CategoryIconSoft
                    key={index.toString()}
                    title={item.title}
                    icon={item.icon}
                    style={{
                      marginRight: index != ECategories.length - 1 ? 20 : 0,
                    }}
                    onPress={() => goProducts(item)}
                  />
                ))}
              </ScrollView> */}

              {/* <Text title3 style={{flex: 1, paddingTop: 20}}>
                {t('e_featured_shop')}
              </Text>

              <Text subhead style={{marginTop: 4}}>
                {t('e_description_featured_shop')}
              </Text>

              <ScrollView
                contentContainerStyle={styles.paddingFlatList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                {EFeaturedShop.map((item, index) => (
                  <ShopCard1
                    onPress={goShop}
                    key={index.toString()}
                    image={item.image}
                    title={item.title}
                    description={item.description}
                    rating={item.rating}
                    totalRating={item.totalRating}
                    style={{
                      marginRight: index != EFeaturedShop.length - 1 ? 10 : 0,
                    }}
                    isVerified={index == 0}
                  />
                ))}
              </ScrollView> */}

              {/* <Text bold style={{marginTop: 8}}>
                Deals By Category
              </Text> */}
              {/* old deals */}
              {/* <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {[...EPopulars, ...EPopulars].map((item, index) => (
                    <View key={index.toString()} style={{ width: "25%" }}>
                      <ProductOffer
                        style={{ marginRight: 5 }}
                        title={item.title}
                        image={item.image}
                      />
                    </View>
                  ))}
                </View> */}

              {/* <ScrollView
                contentContainerStyle={styles.paddingFlatList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                {[...EPopulars, ...EPopulars].map((item, index) => (
                  <ProductOffer
                    item={item}
                    key={index.toString()}
                    style={{marginRight: 11}}
                    title={item.title}
                    image={item.image}
                  />
                ))}
              </ScrollView> */}

              {/* <Text bold style={{marginTop: 8}}>
                Brands
              </Text>

              <ScrollView
                contentContainerStyle={styles.paddingFlatList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                {EPopulars.map((item, index) => (
                  <Brand item={item} key={index.toString()} />
                ))}
              </ScrollView> */}

              <Text bold style={{marginTop: 8}}>
                Recommended
              </Text>

              <ScrollView
                contentContainerStyle={styles.paddingFlatList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                {product?.isRecommended.map((item, index) => (
                  <ProductOffer     
                    item={item}
                    key={index.toString()}
                    style={{marginRight: 11}}
                    title={item.NAME}
                    image={item?.My_Uploaded_files[0]?.My_URL}
                    onPress={() => goProductDetail(item)}
                  />
                ))}
              </ScrollView>
              {/* <Text bold style={{marginTop: 8}}>
                Best Selling
              </Text>

              <ScrollView
                contentContainerStyle={styles.paddingFlatList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                {[...EPopulars, ...EPopulars].map((item, index) => (
                  <ProductOffer
                    item={item}
                    key={index.toString()}
                    style={{marginRight: 11}}
                    title={item.title}
                    image={item.image}
                  />
                ))}
              </ScrollView> */}

              {/* <Text title3 style={{ flex: 1, paddingTop: 20 }}>
                {t("e_featured_shop")}
              </Text>
  
              <Text subhead style={{ marginTop: 4 }}>
                {t("e_description_featured_shop")}
              </Text>
  
              
              <ScrollView
                contentContainerStyle={styles.paddingFlatList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                {EFeaturedShop.map((item, index) => (
                  <ShopCard1
                    // onPress={goShop}
                    key={index.toString()}
                    image={item.image}
                    title={item.title}
                    description={item.description}
                    rating={item.rating}
                    totalRating={item.totalRating}
                    style={{
                      marginRight: index != EFeaturedShop.length - 1 ? 10 : 0,
                    }}
                    isVerified={index == 0}
                  />
                ))}
              </ScrollView> */}

              <HeaderLine
                style={{paddingTop: 20}}
                title={t('Best Selling')}
                onPress={goProducts}
              />
              {/*Not use FlatList in ScrollView */}
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {product?.AllProducts.map((item, index) => (
                  <View key={index.toString()} style={{width: '50%'}}>
                    <ProductGrid1
                      style={{
                        width: '100%',
                        paddingRight: index % 2 == 0 ? 3 : 0,
                        paddingLeft: index % 2 != 0 ? 3 : 0,
                      }}
                      description={item.DESCRIPTION}
                      title={item.NAME}
                      image={item?.My_Uploaded_files[0]?.My_URL}
                      costPrice={'$'+item.FULL_PRICE+',00'}
                      salePrice={'$'+item.DISCOUNT_PRICE+',00'}
                      isFavorite={item.isFavorite}
                      onPress={() => goProductDetail(item)}
                    />
                  </View>
                ))}
              </View>
            </View>
          </Animated.ScrollView>
          <ModalFilter
            options={stores}
            isVisible={modalVisible}
            onSwipeComplete={() => {
              setModalVisible(false);
            }}
            onApply={onChangeStore}
            onSelectFilter={onSelectStore}
          />
        </View>
      </LinearGradient>
    );
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        {loading || !net ? renderPlaceholder() : renderContent()}
      </SafeAreaView>
    </View>
  );
};

export default Home;
