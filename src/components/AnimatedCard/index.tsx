import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { Card } from "../Card";

export const AnimatedCard = ({ item, index, setPatient }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      delay: index * 200,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <Card item={item} setPatient={setPatient} />
    </Animated.View>
  );
};
