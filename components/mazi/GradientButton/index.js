import Text from "@components/Text";
import { BaseColor, useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";

export default function GradientButton(props) {
  const { colors } = useTheme();
  const {
    style,
    styleText,
    icon,
    outline,
    full,
    round,
    loading,
    children,
    ...rest
  } = props;

  return (
    <TouchableOpacity {...rest}>
      <LinearGradient
        start={{ x: 1.4, y: 0.5 }}
        end={{ x: 0, y: 0.5 }}
        colors={[BaseColor.mainGreen, BaseColor.mainBlue]}
        style={StyleSheet.flatten([
          [styles.default],
          outline && [
            styles.outline,
            {
              backgroundColor: colors.card,
              borderColor: colors.primary,
            },
          ],
          full && styles.full,
          round && styles.round,
          style,
        ])}
        activeOpacity={0.9}
      >
        {icon ? icon : null}
        <Text
          style={StyleSheet.flatten([
            styles.textDefault,
            outline && { color: colors.primary },
            styleText,
          ])}
          numberOfLines={1}
        >
          {children || "Button"}
        </Text>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={outline ? colors.primary : BaseColor.whiteColor}
            style={{ paddingLeft: 5 }}
          />
        ) : null}
      </LinearGradient>
    </TouchableOpacity>
  );
}

GradientButton.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.node,
  outline: PropTypes.bool,
  full: PropTypes.bool,
  round: PropTypes.bool,
  loading: PropTypes.bool,
};

GradientButton.defaultProps = {
  style: {},
  icon: null,
  outline: false,
  full: false,
  round: false,
  loading: false,
};
