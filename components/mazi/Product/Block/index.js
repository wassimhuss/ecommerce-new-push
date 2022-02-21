import Icon from '@components/Icon';
import Tag from '@components/Tag';
import Text from '@components/Text';
import {BaseColor, Images, useTheme} from '@config';
import PropTypes from 'prop-types';
import React from 'react';
import {ImageBackground, TouchableOpacity, View} from 'react-native';
import styles from './styles';

const Block = ({
  description,
  title,
  style,
  image,
  costPrice,
  salePrice,
  onPress,
  isFavorite = false,
  salePercent,
}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <ImageBackground
        source={image}
        style={styles.imageBackground}
        imageStyle={{position: 'relative'}}>
        <TouchableOpacity>
          <View
            style={{
              position: 'absolute',
              bottom: 30,
              right: 8,
              backgroundColor: colors.primary,
              borderRadius: 5,
              paddingHorizontal: 5,
            }}>
            <Text style={{color: '#fff'}}>Add to Cart</Text>
          </View>
        </TouchableOpacity>
        <Icon
          name="heart"
          solid={isFavorite}
          size={24}
          color={isFavorite ? colors.primary : BaseColor.whiteColor}
          style={{position: 'absolute', top: 8, right: 8}}></Icon>
        {salePercent ? (
          <Tag small style={styles.salePercent}>
            {salePercent}
          </Tag>
        ) : null}
      </ImageBackground>
      <View style={{paddingHorizontal: 16, paddingVertical: 8}}>
        <Text title2 semibold>
          {title}
        </Text>
        <Text footnote grayColor style={{marginTop: 10}}>
          {description}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text title3>{salePrice}</Text>
          <Text title3 grayColor style={styles.costPrice}>
            {costPrice}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

Block.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  costPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salePercent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
  isFavorite: PropTypes.bool,
};

Block.defaultProps = {
  description: '',
  title: '',
  style: {},
  image: Images.eProduct,
  costPrice: '',
  salePrice: '',
  salePercent: '',
  onPress: () => {},
  isFavorite: false,
};

export default Block;
