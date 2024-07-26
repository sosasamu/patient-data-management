import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

export const AddImage = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="add-a-photo" size={24} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderWidth: 1,
    height: 100,
    justifyContent: "center",
    width: 100,
  },
});
