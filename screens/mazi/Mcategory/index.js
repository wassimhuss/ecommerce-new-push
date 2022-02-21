import {
  CategoryBlock,
  CategoryBoxColor,
  CategoryBoxColor2,
  CategoryGrid,
  CategoryIcon,
  CategoryList,
  Header,
  Icon,
  SafeAreaView,
  Text,
  TextInput,
} from '@components';
import {BaseColor, BaseStyle, Typography, useTheme} from '@config';
import {CategoryData} from '@data';
import * as Utils from '@util';
import React, {useEffect, useState} from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {FlatList, RefreshControl, View} from 'react-native';
import {useTranslation} from 'react-i18next';

const Category = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [modeView, setModeView] = useState('bars');
  const [category, setCategory] = useState(CategoryData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, Math.floor(Math.random() * 1000) + 1000);
  }, []);

  const onChangeView = () => {
    Utils.enableExperimental();
    let mode = 'columns';
    switch (modeView) {
      case 'columns':
        mode = 'th-large';
        break;
      case 'th-large':
        mode = 'list';
        break;
      case 'list':
        mode = 'grip-vertical';
        break;
      case 'grip-vertical':
        mode = 'th-list';
        break;
      case 'th-list':
        mode = 'bars';
        break;
      case 'bars':
        mode = 'columns';
        break;
      default:
        mode = 'columns';
        break;
    }
    setModeView(mode);
  };

  const goToPost = () => {
    navigation.navigate('Post');
  };

  const renderItem = ({item, index}) => {
    switch (modeView) {
      case 'columns':
        return (
          <CategoryBoxColor
            style={{
              paddingLeft: index % 2 == 0 ? 0 : 15,
              paddingBottom: 15,
            }}
            title={item.title}
            icon={item.icon}
            color={item.color}
            onPress={goToPost}
          />
        );
      case 'th-large':
        return (
          <CategoryBoxColor2
            style={{
              paddingLeft: index % 2 == 0 ? 0 : 15,
              paddingBottom: 15,
            }}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            onPress={goToPost}
          />
        );
      case 'list':
        return (
          <CategoryIcon
            style={{
              marginBottom: 10,
            }}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            color={item.color}
            onPress={goToPost}
          />
        );
      case 'grip-vertical':
        return (
          <CategoryGrid
            style={{
              paddingLeft: index % 2 == 0 ? 0 : 15,
              paddingBottom: 15,
            }}
            title={item.title}
            subTitle={item.subtitle}
            icon={item.icon}
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
          <CategoryBlock
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
          <CategoryBoxColor
            index={index}
            title={item.title}
            icon={item.icon}
            color={item.color}
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
      text ? category.filter(item => item.title.includes(text)) : CategoryData,
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

  const renderContent = () => {
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{top: 'always'}}>
        <View style={BaseStyle.container}>
          <Header
            style={{marginBottom: 20}}
            renderLeft={() => (
              <Text header bold>
                {t('categories')}
              </Text>
            )}
            title={''}
            styleLeft={{
              flex: 1,
            }}
            styleContentLeft={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 0,
              width: '100%',
            }}
            styleContentCenter={{
              flex: 0,
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}
            styleRight={{flex: 0}}
            renderRight={() => {
              return (
                <Icon name={modeView} size={20} color={BaseColor.grayColor} />
              );
            }}
            onPressRight={() => onChangeView()}
          />
          <TextInput
            style={[BaseStyle.textInput, Typography.body1]}
            onChangeText={onChangeText}
            autoCorrect={false}
            placeholder={t('search')}
            placeholderTextColor={BaseColor.grayColor}
            value={search}
            selectionColor={colors.primary}
            onSubmitEditing={() => {}}
          />
        </View>

        <FlatList
          key={getTotalCol()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
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

  return loading ? renderPlaceholder() : renderContent();
};

export default Category;
