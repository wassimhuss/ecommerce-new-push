import {
  FilterESort,
  ProductBlock,
  ProductGrid2,
  ProductList,
  SafeAreaView,
  Tag,
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
// Load sample data
import {EPostListData, ESortOption} from '@data';
import {useNavigation} from '@react-navigation/native';
import * as Utils from '@util';
import AnimatedLottieView from 'lottie-react-native';
import React, {Fragment, useEffect, useRef, useState} from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {useTranslation} from 'react-i18next';
import {
  Animated,
  Dimensions,
  Platform,
  RefreshControl,
  View,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import styles from './styles';

const currentLocationInit = {
  latitude: null,
  longitude: null,
};

const initialLayout = {width: Dimensions.get('window').width};

const Product = props => {
  console.log('my search prod  : ' + JSON.stringify(props.products))
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [modeView, setModeView] = useState('list');
  const [list, setList] = useState(EPostListData);
  const [loading, setLoading] = useState(false);
  const[prod,setprod] = useState(props.products);
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;
  const clampedScroll = useRef(
    Animated.diffClamp(
      Animated.add(
        scrollAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolateLeft: 'clamp',
        }),
        offsetAnim,
      ),
      0,
      40,
    ),
  ).current;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, Math.floor(Math.random() * 1000) + 1000);
  }, []);

  const onChangeSort = sortOption => {
    Utils.enableExperimental();
    const {value} = sortOption;
    switch (value) {
      case 'all':
        setprod(props.products);
        break;
      case 'best_match':
        setList(EPostListData.filter(product => product.isBestMatch));
        break;
      case 'price_low_to_high':
        const products = [...props.products];
        props.products.sort((a, b) => {
          return a.DISCOUNT_PRICE - b.DISCOUNT_PRICE;
        });
        setprod(products);
        break;
      case 'price_high_to_low':
        const productHights = [...props.products];
        productHights.sort((a, b) => {
          return b.DISCOUNT_PRICE - a.DISCOUNT_PRICE;
        });
        setprod(productHights);
        break;
      default:
        setprod(props.products);
        break;
    }
  };

  const onFilter = () => {
    navigation.navigate('EFilter');
  };

  const onChangeView = () => {
    Utils.enableExperimental();

    let mode = 'block';
    switch (modeView) {
      case 'block':
        mode = 'grid';
        break;
      case 'grid':
        mode = 'list';
        break;
      case 'list':
        mode = 'block';
        break;
      default:
        break;
    }
    setModeView(mode);
  };

  const getTotalCol = () => {
    switch (modeView) {
      case 'block':
        return 1;
      case 'list':
        return 1;
      case 'grid':
        return 2;
      default:
        return 1;
    }
  };

  const goProductDetail = item => {
    navigation.navigate('EProductDetail', {item: item});
  };

  const renderItem = ({item, index}) => {
    switch (modeView) {
      case 'list':
        return (
          <ProductList
            description={item.DESCRIPTION}
            title={item.NAME}
            style={{marginVertical: 8}}
            image={item.My_Uploaded_files[0]?.My_URL}
            costPrice={"$"+item.FULL_PRICE+',00'}
            salePrice={"$"+item.DISCOUNT_PRICE+",00"}
            onPress={() => goProductDetail(item)}
           // isFavorite={item.isFavorite}
          //  salePercent={item.DISCOUNT_PRICE}
          />
        );
      case 'grid':
        return (
          <ProductGrid2
          description={item.DESCRIPTION}
          title={item.NAME}
            style={{
              paddingLeft: index % 2 ? 4 : 0,
              paddingRight: index % 2 ? 0 : 4,
              width: '50%',
              paddingBottom: 16,
            }}
            image={item.My_Uploaded_files[0]?.My_URL}
            costPrice={"$"+item.FULL_PRICE+',00'}
            salePrice={"$"+item.DISCOUNT_PRICE+",00"}
            onPress={() => goProductDetail(item)}
            //isFavorite={item.isFavorite}
           // salePercent={item.salePercent}
          />
        );

      case 'block':
        return (
          <ProductBlock
          description={item.DESCRIPTION}
          title={item.NAME}
            style={{marginVertical: 8}}
            image={item.My_Uploaded_files[0]?.My_URL}
            costPrice={"$"+item.FULL_PRICE+',00'}
            salePrice={"$"+item.DISCOUNT_PRICE+",00"}
            onPress={() => goProductDetail(item)}
            isFavorite={item.isFavorite}
            salePercent={item.salePercent}
          />
        );

      default:
        break;
    }
  };

  const renderList = () => {
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, 40],
      outputRange: [0, -40],
      extrapolate: 'clamp',
    });
    const android = Platform.OS == 'android';
    return (
      <View style={{flex: 1}}>
        <Animated.FlatList
          contentInset={{top: 50}}
          contentContainerStyle={{
            marginTop: android ? 50 : 0,
            paddingHorizontal: modeView != 'block' ? 20 : 0,
          }}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollAnim,
                  },
                },
              },
            ],
            {useNativeDriver: true},
          )}
          data={prod}
          key={getTotalCol()}
          numColumns={getTotalCol()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
        <Animated.View
          style={[
            styles.navbar,
            {backgroundColor: colors.background},
            {transform: [{translateY: navbarTranslate}]},
          ]}>
          <FilterESort
            title={`${props.products.length} Products`}
            modeView={modeView}
            sortOption={ESortOption}
            onChangeSort={onChangeSort}
            onChangeView={onChangeView}
            onFilter={onFilter}
          />
        </Animated.View>
        {prod.length == 0 ?
         <View style={{width:"100%", height:"100%" ,alignItems:"center",justifyContent:"center"}}>
         <AnimatedLottieView source={require('../../../utils/images/68395-data-not-found.json')} autoPlay loop  style={{width: 300, height: 400}}/>
         </View> 
          : 
        null

        }
      </View>
    );
  };

  const renderPlaceholder = () => {
    return (
      <View style={BaseStyle.container}>
        <ContentLoader
          speed={0.5}
          width={'100%'}
          height={'100%'}
          backgroundColor="#f3f3f3"
          foregroundColor={BaseColor.dividerColor}>
          <Rect x="0" y="0" rx="8" ry="8" width="100%" height="30" />
          <Rect x="0" y="50" rx="8" ry="8" width="100%" height={250} />
          <Rect x="0" y="315" rx="8" ry="8" width="100%" height={250} />
          <Rect x="0" y="580" rx="8" ry="8" width="100%" height={250} />
        </ContentLoader>
      </View>
    );
  };

  return <Fragment>{loading ? renderPlaceholder() : renderList()}</Fragment>;
};

const PostTab = (props) => {
  const products = props.route.params.products.products
  
  const {colors} = useTheme();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'clothing', title: 'Clothing'},
    {key: 'accessories', title: 'Accessories'},
    
  ]);

  const renderScene = SceneMap({
    clothing: Product,
    accessories: Product,
  });
  const renderTabBar = props => (
    <TabBar
      {...props}
      renderIndicator={() => null}
      scrollEnabled
      style={[styles.tabbar, {backgroundColor: colors.background}]}
      tabStyle={styles.tab}
      activeColor={BaseColor.whiteColor}
      inactiveColor={colors.text}
      renderLabel={({route, focused, color}) => (
        <Tag
          primary={true}
          style={{
            backgroundColor: focused ? colors.primary : colors.background,
          }}
          textStyle={{
            color: color,
          }}>
          {route.title}
        </Tag>
      )}
    />
  );

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      {/* <TabView
        scrollEnabled={true}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      /> */}
      <Product 
      products={products}
      />
    </SafeAreaView>
  );
};

export default PostTab;
