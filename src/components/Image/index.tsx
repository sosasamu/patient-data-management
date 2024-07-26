import React, { useState } from "react";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Pressable, StyleSheet, View } from "react-native";
import { ImagePreview } from "./imagePreview";
import { AddImage } from "./addImage";

const imgDir = FileSystem.documentDirectory + "images/";

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

interface IImageUpload {
  avatar?: string;
  onChange?: (dest: string) => void;
}

export const ImageUpload = ({ avatar, onChange }: IImageUpload) => {
  const [image, setImage] = useState(avatar);
  const selectImage = async () => {
    let result: ImagePicker.ImagePickerResult;
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
    };

    result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled) {
      saveImage(result.assets[0].uri);
    }
  };

  const saveImage = async (uri: string) => {
    await ensureDirExists();
    const filename = `${new Date().getTime()}.jpg`;
    const dest = imgDir + filename;
    await FileSystem.copyAsync({ from: uri, to: dest });
    setImage(dest);
    onChange(dest);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => selectImage()} style={styles.pressable}>
        {image ? <ImagePreview image={image} /> : <AddImage />}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 8,
  },
  pressable: { width: 100 },
});
