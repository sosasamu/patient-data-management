import React from "react";
import { StyleSheet, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

export const ImageError = () => (
  <View style={styles.imageErrorContainer}>
    <FontAwesome6 name="file-circle-exclamation" size={24} color="black" />
  </View>
);

const styles = StyleSheet.create({
  imageErrorContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
