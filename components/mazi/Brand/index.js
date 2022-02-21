import React from 'react';
import {StyleSheet, View} from 'react-native';
import Image from '@components/Image';
import Text from '@components/Text';
import {BaseColor, Images, useTheme} from '@config';

const index = ({item}) => {
  console.log(item);
  return (
    <View style={{marginRight: 10}}>
      <Image
        source={{
          uri: 'https://mir-s3-cdn-cf.behance.net/projects/404/f1de0064360567.Y3JvcCw4MTAsNjM0LDE0OCww.png',
        }}
        style={{
          width: 60,
          height: 60,
          borderWidth: 1,
          borderColor: BaseColor.mainBlue,
          backgroundColor: BaseColor.mainGrey,
        }}
      />
      <Text bold style={{textAlign: 'center'}}>
        Nike
      </Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
