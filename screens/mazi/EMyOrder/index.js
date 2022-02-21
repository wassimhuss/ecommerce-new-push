import {
  ProductOrderItemList,
  SafeAreaView,
  Tag,
  Text,
  Header,
  Icon,
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
import {CompletedOrders} from '@data';
import React, {Fragment, useEffect, useState} from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {useTranslation} from 'react-i18next';
import {FlatList, RefreshControl, View} from 'react-native';
import {enableExperimental} from '@util';

const TABS = [
  {
    id: 1,
    title: 'Completed',
    key: 'isCompleted',
  },
  {
    id: 2,
    title: 'Cancelled',
    key: 'isCancelled',
  },
  {
    id: 3,
    title: 'Requested',
    key: 'isRequested',
  },
];

const EMyOrder = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState(CompletedOrders);
  const [loading, setLoading] = useState(true);

  const [tabChoosed, setTabChoosed] = useState(TABS[0]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, Math.floor(Math.random() * 1000));
  }, []);

  useEffect(() => {
    enableExperimental();
    setProducts(CompletedOrders.filter(order => order[tabChoosed.key]));
  }, [tabChoosed]);

  const renderPlaceholder = () => {
    let holders = Array.from(Array(10));
    let y = 0;
    let height = 60;

    return (
      <View style={BaseStyle.container}>
        <ContentLoader
          speed={0.5}
          width={'100%'}
          height={'100%'}
          backgroundColor="#f3f3f3"
          foregroundColor={BaseColor.dividerColor}>
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
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        <View style={[{flex: 1, paddingBottom: 10}]}>
          <Header
            title={t('order_history')}
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

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              paddingVertical: 16,
            }}>
            {TABS.map(tab => (
              <View key={tab.id} style={{flex: 1, padding: 4}}>
                <Tag
                  primary={true}
                  style={{
                    backgroundColor:
                      tab.id == tabChoosed.id
                        ? colors.primary
                        : colors.background,
                  }}
                  textStyle={{
                    color:
                      tab.id == tabChoosed.id
                        ? BaseColor.whiteColor
                        : colors.text,
                  }}
                  onPress={() => setTabChoosed(tab)}>
                  {tab.title}
                </Tag>
              </View>
            ))}
          </View>

          <FlatList
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
            data={products}
            keyExtractor={(item, index) => item.id}
            renderItem={({item, index}) => (
              <View
                style={{
                  paddingTop: 20,
                  backgroundColor: colors.card,
                }}>
                <ProductOrderItemList
                  style={{
                    padding: 20,
                    backgroundColor: colors.background,
                  }}
                  orderData={item}
                  onPress={() => navigation.navigate('ETrackOrder')}
                />
              </View>
            )}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView]} forceInset={{top: 'always'}}>
      {loading ? renderPlaceholder() : renderContent()}
    </SafeAreaView>
  );
};

export default EMyOrder;
