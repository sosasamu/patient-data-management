import React from "react";
import { Dimensions, Pressable, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const AddPatientButton = ({ showModal }) => {
  return (
    <Pressable onPress={showModal} style={styles.buttonContainer}>
      <FontAwesome6 name="add" size={24} color="white" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 100,
    bottom: SCREEN_HEIGHT * 0.05,
    height: 50,
    justifyContent: "center",
    position: "absolute",
    right: SCREEN_WIDTH * 0.05,
    width: 50,
  },
});
