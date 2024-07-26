import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Patient } from "@/types/patient";
import {
  useCreatePatient,
  useEditPatient,
  useGetPatients,
} from "@/hooks/usePatient";
import { ImageUpload } from "../Image";
import Toast from "react-native-toast-message";
import { useState } from "react";

interface FormProps {
  id: string;
  hideModal: () => void;
}

export default function Form({ id, hideModal }: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const getPatients = useGetPatients();
  const patient = getPatients.data?.find((patient) => patient.id === id);
  const editPatient = useEditPatient();
  const createPatient = useCreatePatient();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<Patient, "createdAt">>({
    defaultValues: {
      id: patient?.id,
      avatar: patient?.avatar,
      description: patient?.description,
      name: patient?.name,
      website: patient?.website,
    },
  });

  const showToast = (message: string) => {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: `Patient successfully ${message}`,
    });
  };

  const onSubmit = async (data: Patient) => {
    setIsSubmitting(true);
    if (!id) {
      await createPatient.mutateAsync({ ...data });
      showToast("created");
    } else {
      await editPatient.mutateAsync({ ...data });
      showToast("updated");
    }
    reset();
    setIsSubmitting(false);
    hideModal();
  };

  return (
    <View style={styles.formContainer}>
      <Controller
        control={control}
        rules={{
          required: { value: true, message: "Image required" },
        }}
        render={({ field: { onChange, value } }) => (
          <ImageUpload avatar={value} onChange={onChange} />
        )}
        name="avatar"
      />
      {errors.avatar && (
        <Text style={styles.errorMessage}>{errors.avatar.message}</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: { value: true, message: "Name required" },
          minLength: {
            value: 6,
            message: "Name should be at least 6 characters long",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Full Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={[
              styles.input,
              styles.textInput,
              errors.name ? { borderColor: "red" } : {},
            ]}
          />
        )}
        name="name"
      />
      {errors.name && (
        <Text style={styles.errorMessage}>{errors.name.message}</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: { value: true, message: "Description required" },
          minLength: {
            value: 50,
            message: "Description should be at least 50 characters long",
          },
          maxLength: {
            value: 1000,
            message: "Description should be less than 1000 characters",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline
            placeholder="Description"
            style={[
              styles.input,
              styles.multilineTextInput,
              errors.description ? { borderColor: "red" } : {},
            ]}
          />
        )}
        name="description"
      />
      {errors.description && (
        <Text style={styles.errorMessage}>{errors.description.message}</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: { value: true, message: "Website required" },
          pattern: {
            value:
              /^((https?):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/i,
            message: "Website pattern does not match",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Website"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={[
              styles.input,
              styles.textInput,
              errors.name ? { borderColor: "red" } : {},
            ]}
            autoCapitalize="none"
          />
        )}
        name="website"
      />
      {errors.website && (
        <Text style={styles.errorMessage}>{errors.website.message}</Text>
      )}

      <Button
        disabled={isSubmitting}
        title="Submit"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  errorMessage: {
    color: "red",
    fontWeight: "600",
  },
  formContainer: {
    flex: 1,
    gap: 16,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 12,
  },
  multilineTextInput: {
    height: 175,
    alignItems: "flex-start",
  },
  textInput: {
    height: 40,
  },
});
