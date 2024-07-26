import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

export const EditIconWithAction = ({ handleOnPress }) => {
  return (
    <Pressable
      onPress={() => {
        handleOnPress();
      }}
      style={styles.pressable}
    >
      <FontAwesome6 name="edit" size={24} color="black" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    padding: 4,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 9999999,
  },
});
