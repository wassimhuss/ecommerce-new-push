import {
  CategoryList,
  HeaderAnimated,
  Icon,
  ProductCategory1,
  ProductCategory2,
  ProductCategory3,
  SafeAreaView,
  Text,
  TextInput,
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
import {ECategoryData} from '@data';
import * as Utils from '@util';
import React, {useEffect, useRef, useState} from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {useTranslation} from 'react-i18next';
import {
  Animated,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ECategory = props => {
  const {navigation, route} = props;
  const ismain = route?.params?.mainnav;

  //console.log('blabalblalbllablbalabla  :    ', ismain);
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [modeView, setModeView] = useState('grip-vertical');
  const [category, setCategory] = useState(ECategoryData);
  const [loading, setLoading] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, Math.floor(Math.random() * 1000) + 1000);
  }, []);

  const onChangeView = () => {
    Utils.enableExperimental();

    let mode = 'bars';
    switch (modeView) {
      case 'bars':
        mode = 'th-large';
        break;
      case 'th-large':
        mode = 'grip-vertical';
        break;
      case 'grip-vertical':
        mode = 'th-list';
        break;
      case 'th-list':
        mode = 'bars';
        break;

      default:
        mode = 'bars';
        break;
    }
    setModeView(mode);
  };

  const goToPost = () => {
    navigation.navigate('EProduct');
  };

  const renderItem = ({item, index}) => {
    switch (modeView) {
      case 'th-large':
        return (
          <ProductCategory2
            style={{
              width: '50%',
              paddingLeft: index % 2 == 0 ? 0 : 15,
              marginBottom: 15,
            }}
            image={item.image}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            onPress={goToPost}
          />
        );

      case 'grip-vertical':
        return (
          <ProductCategory3
            style={{
              width: '50%',
              paddingLeft: index % 2 == 0 ? 0 : 15,
              paddingBottom: 15,
            }}
            title={item.title}
            subtitle={item.subtitle}
            image={item.image}
            onPress={goToPost}
          />
        );
      case 'th-list':
        return (
          <CategoryList
            style={{
              paddingBottom: 15,
            }}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            color={item.color}
            image={item.image}
            onPress={goToPost}
          />
        );
      case 'bars':
        return (
          <ProductCategory1
            style={{
              paddingBottom: 15,
            }}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            image={item.image}
            onPress={goToPost}
          />
        );

      default:
        return (
          <ProductCategory1
            style={{
              paddingBottom: 15,
            }}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            image={item.image}
            onPress={goToPost}
          />
        );
    }
  };

  const getTotalCol = () => {
    switch (modeView) {
      case 'columns':
        return 2;
      case 'th-large':
        return 2;
      case 'list':
        return 1;
      case 'grip-vertical':
        return 2;
      case 'th-list':
        return 1;
      case 'bars':
        return 1;
      default:
        return 1;
    }
  };

  const onChangeText = text => {
    setSearch(text);
    setCategory(
      text ? category.filter(item => item.title.includes(text)) : ECategoryData,
    );
  };

  const renderPlaceholder = () => {
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{top: 'always'}}>
        <View style={BaseStyle.container}>
          <ContentLoader
            speed={0.5}
            width={'100%'}
            height={'100%'}
            backgroundColor="#f3f3f3"
            foregroundColor={BaseColor.dividerColor}>
            <Rect x="0" y="0" rx="8" ry="8" width="40%" height="30" />

            <Rect x="0" y="40" rx="8" ry="8" width="100%" height="30" />
            <Rect x="0" y="90" rx="8" ry="8" width="100%" height={120} />
            <Rect x="0" y="225" rx="8" ry="8" width="100%" height={120} />
            <Rect x="0" y="360" rx="8" ry="8" width="100%" height={120} />
            <Rect x="0" y="495" rx="8" ry="8" width="100%" height={120} />
            <Rect x="0" y="630" rx="8" ry="8" width="100%" height={120} />
          </ContentLoader>
        </View>
      </SafeAreaView>
    );
  };
  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: false,
    },
  );
  const renderContent = () => {
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{top: 'always'}}>
        <HeaderAnimated
          heightScroll={100}
          widthRight={60}
          scrollY={scrollY}
          componentLeft={
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {ismain ? null : (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon
                    name="angle-left"
                    size={20}
                    color={colors.text}
                    enableRTL={true}
                    style={{marginRight: 16}}
                  />
                </TouchableOpacity>
              )}

              <Text header bold>
                {t('categories')}
              </Text>
            </View>
          }
          componentRight={
            <TouchableOpacity style={{paddingTop: 6}} onPress={onChangeView}>
              <Icon name={modeView} size={20} color={BaseColor.grayColor} />
            </TouchableOpacity>
          }
          componentBottom={
            <TouchableOpacity
              onPress={() => navigation.navigate('ESearchHistory')}>
              <TextInput
                placeholder={t('enter_keywords')}
                placeholderTextColor={BaseColor.grayColor}
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>
          }
        />

        <AnimatedFlatList
          onScroll={onScroll}
          scrollEventThrottle={16}
          key={getTotalCol()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 20,
          }}
          numColumns={getTotalCol()}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          data={category}
          keyExtractor={(item, index) => item.id}
          renderItem={renderItem}
        />
      </SafeAreaView>
    );
  };

  return loading && false ? renderPlaceholder() : renderContent();
};

export default ECategory;
