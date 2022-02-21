import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "@components";
import { BaseColor } from "@config";

const index = ({ name, color }) => {
  return (
    <View style={styles.container}>
      <Icon name={name} size={20} color={color} />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BaseColor.mainGrey,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    borderRadius: 50,
    elevation: 5,
    marginRight: 10,
  },
});
