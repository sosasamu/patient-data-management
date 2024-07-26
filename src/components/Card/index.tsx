import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Linking,
  Pressable,
  Animated,
  Platform,
  UIManager,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Patient } from "@/types/patient";
import { EditIconWithAction } from "../EditIcon";
import { getWebsiteName, handleDate, onIconPressed, onLayout } from "./helper";
import { ImageError } from "../Image/imageError";

interface ICard {
  item: Patient;
  setPatient: () => void;
}

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const Card = ({ item, setPatient }: ICard) => {
  const [expanded, setExpanded] = useState(false);
  const [iconName, setIconName] = useState("caret-down");
  const [height, setHeight] = useState(0);
  const [numberOfLines, setNumberOfLines] = useState(3);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIconName(expanded ? "caret-up" : "caret-down");
    setNumberOfLines(expanded ? 0 : 3);
  }, [expanded]);

  return (
    <Animated.View>
      <View
        style={styles.card}
        onLayout={(e) => onLayout(e, setHeight, height)}
      >
        <View style={styles.layout}>
          <EditIconWithAction handleOnPress={() => setPatient()} />
          <View>
            {imageError ? (
              <ImageError />
            ) : (
              <Image
                style={styles.image}
                source={{ uri: item.avatar }}
                onError={() => setImageError(true)}
              />
            )}
            {expanded ? (
              <View>
                <Text style={styles.created}>Created: </Text>
                <Text>{handleDate(item.createdAt)}</Text>
              </View>
            ) : null}
          </View>
          <View style={styles.textContainer}>
            <View>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text
                  style={styles.website}
                  onPress={() => Linking.openURL(item.website)}
                >
                  {getWebsiteName(item.website)}
                </Text>
              </View>
              <Text ellipsizeMode="tail" numberOfLines={numberOfLines}>
                {item.description}
              </Text>
            </View>
          </View>
        </View>
        <Pressable
          onPress={() => onIconPressed(() => setExpanded(!expanded))}
          style={styles.expandContainer}
        >
          <FontAwesome6 name={iconName} size={24} color="black" />
        </Pressable>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  created: { fontWeight: "bold" },
  expandContainer: {
    marginTop: 4,
    borderTopWidth: 0.5,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    alignItems: "center",
  },
  image: {
    aspectRatio: 1,
    width: 100,
  },
  layout: {
    flex: 1,
    flexDirection: "row",
    gap: 16,
    padding: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  website: {
    textDecorationLine: "underline",
    marginBottom: 8,
  },
});
