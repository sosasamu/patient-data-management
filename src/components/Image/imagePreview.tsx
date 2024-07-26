import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { Image, StyleSheet, View } from "react-native";

export const ImagePreview = ({ image }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome6 name="edit" size={24} color="white" />
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: 100 },
  iconContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 99999,
  },
  image: {
    width: 100,
    height: 100,
  },
  imageContainer: {
    justifyContent: "center",
  },
});
