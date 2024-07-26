import { Patient } from "@/types/patient";

const URL_BASE = "https://63bedcf7f5cfc0949b634fc8.mockapi.io/users";

export const getPatients = async (): Promise<Patient[]> => {
  return await (await fetch(URL_BASE)).json();
};

export const createPatient = async (
  patient: Omit<Patient, "id">,
): Promise<Patient> => {
  const ID = () => Math.floor(Math.random() * 1000);
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve({
        ...patient,
        createdAt: new Date().toString(),
        id: ID().toString(),
      });
    }, 1000);
  });
};

export const editPatient = async (patient: Patient): Promise<Patient> => {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve(patient);
    }, 1000);
  });
};
