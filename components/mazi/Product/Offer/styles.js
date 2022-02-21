import * as Utils from '@util';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
    width: 110,
    height: 130,
    elevation: 10,
  },
  image: {
    width: 100,
    height: 90,
    // paddingVertical: 5,
    marginBottom: 3,
  },
  textBackground: {
    backgroundColor: '#89cff0',
    width: '100%',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingVertical: 1,
  },
  text: {
    fontSize: 8,
    textAlign: 'center',
    color: '#fff',
  },
  discountContainer: {
    marginTop: 2,
    paddingHorizontal: 4,
    backgroundColor: BaseColor.yellowColor,
    width: 40,
    borderRadius: 30,
    // alignItems: "center",
  },
  discount: {
    fontSize: 9,
    color: '#fff',
    textAlign: 'center',
  },
});
