import { Patient } from "@/types/patient";
import { createPatient, editPatient, getPatients } from "@/network/patient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const key = "patients";

export const useGetPatients = () => {
  return useQuery({ queryKey: [key], queryFn: getPatients });
};

export const useCreatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPatient,
    onSuccess: (patient: Patient) => {
      queryClient.setQueryData([key], (prevPatients: Patient[] | undefined) =>
        prevPatients ? [patient, ...prevPatients] : [patient],
      );
    },
  });
};

export const useEditPatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editPatient,
    onSuccess: (updatedPatient: Patient) => {
      queryClient.setQueryData([key], (prevPatients: Patient[] | undefined) => {
        if (prevPatients) {
          prevPatients.map((patient) => {
            if (patient.id === updatedPatient.id) {
              patient.name = updatedPatient.name;
            }
            return patient;
          });
        }
        return prevPatients;
      });
    },
  });
};
