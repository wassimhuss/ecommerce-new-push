import {
  FilterSort,
  Header,
  Icon,
  News169,
  News43,
  NewsGrid,
  NewsList,
  SafeAreaView,
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
// Load sample data
import {PostListData} from '@data';
import * as Utils from '@utils';
import React, {useEffect, useRef, useState} from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {Animated, Platform, RefreshControl, View} from 'react-native';
import styles from './styles';
import {useTranslation} from 'react-i18next';

const currentLocationInit = {
  latitude: null,
  longitude: null,
};

const Post = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [modeView, setModeView] = useState('square');
  const [currentLocation, setCurrentLocation] = useState(currentLocationInit);
  const [list, setList] = useState(PostListData);
  const [loading, setLoading] = useState(false);
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

  const onChangeSort = () => {};

  const onFilter = () => {
    navigation.navigate('Filter');
  };

  const onChangeView = () => {
    Utils.enableExperimental();

    let mode = 'square';
    switch (modeView) {
      case 'square':
        mode = 'bars';
        break;
      case 'bars':
        mode = 'th-list';
        break;
      case 'th-list':
        mode = 'th-large';
        break;
      case 'th-large':
        mode = 'square';
        break;

      default:
        break;
    }
    setModeView(mode);
  };

  const getTotalCol = () => {
    switch (modeView) {
      case 'square':
        return 1;
      case 'bars':
        return 1;
      case 'th-list':
        return 1;
      case 'th-large':
        return 2;
      default:
        return 1;
    }
  };

  const goPostDetail = item => () => {
    navigation.navigate('PostDetail', {item: item});
  };

  const renderItem = ({item, index}) => {
    switch (modeView) {
      case 'square':
        return (
          <News43
            style={{marginVertical: 8}}
            name={item.name}
            description={item.description}
            title={item.title}
            image={item.image}
            onPress={goPostDetail(item)}
          />
        );
      case 'bars':
        return (
          <News169
            style={{marginVertical: 8}}
            name={item.name}
            description={item.description}
            title={item.title}
            image={item.image}
            onPress={goPostDetail(item)}
          />
        );

      case 'th-list':
        return (
          <NewsList
            style={{marginVertical: 8}}
            description={item.description}
            title={item.title}
            subtitle={item.subtitle}
            date={item.date}
            image={item.image}
            onPress={goPostDetail(item)}
          />
        );
      case 'th-large':
        return (
          <NewsGrid
            style={{
              paddingLeft: index % 2 == 0 ? 0 : 15,
              paddingBottom: 15,
            }}
            image={item.image}
            description={item.description}
            title={item.title}
            onPress={goPostDetail(item)}
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
            paddingHorizontal: 20,
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
          data={list}
          key={getTotalCol()}
          numColumns={getTotalCol()}
          keyExtractor={(item, index) => item.id}
          renderItem={renderItem}
        />
        <Animated.View
          style={[styles.navbar, {transform: [{translateY: navbarTranslate}]}]}>
          <FilterSort
            modeView={modeView}
            onChangeSort={onChangeSort}
            onChangeView={onChangeView}
            onFilter={onFilter}
          />
        </Animated.View>
      </View>
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
            <Rect x="0" y="0" rx="8" ry="8" width="100%" height="30" />
            <Rect x="0" y="50" rx="8" ry="8" width="100%" height={250} />
            <Rect x="0" y="315" rx="8" ry="8" width="100%" height={250} />
            <Rect x="0" y="580" rx="8" ry="8" width="100%" height={250} />
          </ContentLoader>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title={t('posts')}
        renderRight={() => {
          return <Icon name="search" size={20} color={colors.primary} />;
        }}
        onPressRight={() => {
          navigation.navigate('SearchHistory');
        }}
      />
      {loading ? renderPlaceholder() : renderList()}
    </SafeAreaView>
  );
};

export default Post;
