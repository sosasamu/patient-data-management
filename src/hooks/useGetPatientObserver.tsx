import { QueryObserver, useQueryClient } from "@tanstack/react-query";
import { useGetPatients } from "./usePatient";
import { useEffect, useState } from "react";
import { Patient } from "@/types/patient";

const key = "patients";

export const useGetPatientsObserver = () => {
  const getPatients = useGetPatients();

  const queryClient = useQueryClient();

  const [patients, setPatients] = useState<Patient[]>(() => {
    const data = queryClient.getQueryData<Patient[]>([key]);
    return data ?? [];
  });

  useEffect(() => {
    const observer = new QueryObserver<Patient[]>(queryClient, {
      queryKey: [key],
    });

    const unsubscribe = observer.subscribe((result) => {
      if (result.data) setPatients(result.data);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    ...getPatients,
    data: patients,
  };
};
