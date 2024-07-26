import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { AnimatedCard } from "@/components/AnimatedCard";
import { BottomSheet } from "@/components/BottomSheet";
import { useGetPatientsObserver } from "@/hooks/useGetPatientObserver";
import { Patient } from "@/types/patient";
import { AddPatientButton } from "@/components/AddPatientButton";

export const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [patient, setPatient] = useState<Patient | undefined>();

  const { isPending, error, data } = useGetPatientsObserver();

  useEffect(() => {
    if (patient) {
      setModalVisible(true);
    }
  }, [patient]);

  useEffect(() => {
    if (!modalVisible) {
      setPatient(undefined);
    }
  }, [modalVisible]);

  if (isPending) return <ActivityIndicator size="large" />;

  if (error) return <Text>An error has occurred: {error.message}</Text>;

  return (
    <SafeAreaView style={style.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <AnimatedCard
            item={item}
            index={index}
            setPatient={() => setPatient(item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <BottomSheet
        id={patient?.id}
        modalVisible={modalVisible}
        setModalVisible={() => setModalVisible(false)}
      />
      <AddPatientButton showModal={() => setModalVisible(true)} />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: StatusBar.currentHeight || 0,
  },
});
