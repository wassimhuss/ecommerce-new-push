import Icon from '@components/Icon';
import Text from '@components/Text';
import {BaseColor, Images, useTheme} from '@config';
import PropTypes from 'prop-types';
import React from 'react';
import {ImageBackground, TouchableOpacity, View} from 'react-native';
import styles from './styles';

const Grid1 = ({
  description,
  title,
  style,
  image,
  costPrice,
  salePrice,
  onPress,
  isFavorite,
}) => {
  const {colors} = useTheme();
  console.log(image)
  return (
    <TouchableOpacity style={[styles.grid1, style]} onPress={onPress}>
      <ImageBackground
        // source={(image)}
        
       source={{uri: typeof(image) == 'string' ? image :'https://previews.123rf.com/images/kaymosk/kaymosk1804/kaymosk180400006/100130939-error-404-page-not-found-error-with-glitch-effect-on-screen-vector-illustration-for-your-design-.jpg'}}
        style={styles.imageBackgroundGrid1}
        imageStyle={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          position: 'relative',
        }}>
        {/* <Icon
          name="heart"
          solid={isFavorite}
          size={16}
          color={isFavorite ? colors.primary : BaseColor.whiteColor}
          style={{position: 'absolute', top: 8, right: 8}}></Icon> */}
        <TouchableOpacity>
          <View
            style={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              backgroundColor: colors.primary,
              borderRadius: 5,
              paddingHorizontal: 5,
            }}>
            <Text style={{color: '#fff'}}>Add to Cart</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>

      <View
        style={{
          backgroundColor: '#fff',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          paddingHorizontal: 2,
        }}>
        <Text
          subhead
          bold
          numberOfLines={2}
          style={{marginTop: 3, fontSize: 11}}>
          {title}
        </Text>
        <Text footnote grayColor style={{marginTop: 3, fontSize: 10}}>
          {description}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 6}}>
          <Text subhead bold>
            {salePrice}
          </Text>
          <Text subhead grayColor style={styles.costPrice}>
            {costPrice}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

Grid1.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  costPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
  isFavorite: PropTypes.bool,
};

Grid1.defaultProps = {
  description: '',
  title: '',
  style: {},
  image: Images.eProduct,
  costPrice: '',
  salePrice: '',
  onPress: () => {},
  isFavorite: false,
};

export default Grid1;
