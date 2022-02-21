import Icon from '@components/Icon';
import Text from '@components/Text';
import {useTheme} from '@config';
import PropTypes from 'prop-types';
import React from 'react';
import {TouchableOpacity, View, ImageBackground} from 'react-native';
import styles from './styles';
import {Images, BaseColor} from '@config';
import {parseHexTransparency} from '@util';

const ProductCategory2 = props => {
  const {title, subtitle, image, style, onPress} = props;
  const {colors} = useTheme();

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <ImageBackground
        source={image}
        style={styles.imageBackground}
        imageStyle={{borderRadius: 8}}>
        <View style={[styles.content]}>
          <View
            style={[
              styles.viewText,
              {
                backgroundColor: parseHexTransparency(BaseColor.whiteColor, 90),
              },
            ]}>
            <Text headline style={{color: colors.text}} numberOfLines={1}>
              {title}
            </Text>
            <Text subhead grayColor>
              {subtitle}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

ProductCategory2.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  image: PropTypes.node.isRequired,
};

ProductCategory2.defaultProps = {
  onPress: () => {},
  style: {},
  subtitle: '',
  title: '',
  image: Images.location1,
};

export default ProductCategory2;
