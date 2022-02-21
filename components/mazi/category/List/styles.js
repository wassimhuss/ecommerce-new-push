import {StyleSheet} from 'react-native';
import * as Utils from '@util';
import {BaseColor} from '@config';

export default StyleSheet.create({
  contain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentRate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: Utils.scaleWithPixel(110),
    height: Utils.scaleWithPixel(80),
    borderRadius: 8,
  },
  paddingVertical5: {
    paddingVertical: 5,
  },
  imageWishlist: {
    width: Utils.scaleWithPixel(80),
    height: Utils.scaleWithPixel(80),
    borderRadius: 8,
  },
  icon: {
    color: BaseColor.grayColor,
  },
});
