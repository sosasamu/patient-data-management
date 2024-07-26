import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Form from "../Form";
import { FontAwesome6 } from "@expo/vector-icons";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export interface IBottomSheetRef {
  expand: () => void;
  collapse: () => void;
}
export const BottomSheet = ({ modalVisible, id, setModalVisible }) => {
  return (
    <>
      <Animated.View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <Pressable
              style={styles.closeModal}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <FontAwesome6 name="xmark" size={24} color="black" />
            </Pressable>
            <Form id={id} hideModal={() => setModalVisible()} />
          </View>
        </Modal>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "#000000",
    bottom: 0,
    elevation: 10,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    bottom: 0,
    elevation: 20,
    height: SCREEN_HEIGHT * 0.7,
    left: SCREEN_WIDTH * 0.025,
    padding: 24,
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    width: SCREEN_WIDTH * 0.95,
  },
  closeModal: {
    position: "absolute",
    right: 16,
    top: 16,
    zIndex: 999999,
  },
});
