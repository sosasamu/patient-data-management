import { LayoutAnimation, LayoutChangeEvent } from "react-native";

export const getWebsiteName = (website: string) => {
  const splitted = website.split("/");
  return splitted[splitted.length - 1].split(".")[0];
};

export const onIconPressed = (setExpanded: () => void) => {
  LayoutAnimation.configureNext({
    ...LayoutAnimation.Presets.spring,
    duration: 500,
  });
  setExpanded();
};

export const onLayout = (
  event: LayoutChangeEvent,
  setHeight: (onLayoutHeight: number) => void,
  height: number,
) => {
  const onLayoutHeight = event.nativeEvent.layout.height;

  if (height !== onLayoutHeight) {
    setHeight(onLayoutHeight);
  }
};

export const handleDate = (date: string) => {
  const newDate = new Date(date);
  return `${newDate.getDay()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
};
