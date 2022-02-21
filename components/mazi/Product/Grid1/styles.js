import * as Utils from '@util';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  imageBackgroundGrid1: {
    width: '100%',
    height: Utils.scaleWithPixel(130),
    position: 'relative',
  },
  grid1: {
    width: '50%',
    paddingVertical: 5,
  },
  costPrice: {paddingHorizontal: 8, textDecorationLine: 'line-through'},
});
