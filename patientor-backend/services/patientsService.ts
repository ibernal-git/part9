import patientsData from '../data/patients.json';
import { NonSensitivePatient, Patient } from '../types';

const getNonSensitivePatients = (): NonSensitivePatient [] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( data: Patient ): NonSensitivePatient => {
  const newPatientData = data;

  patientsData.push(newPatientData);

  return newPatientData;
};
export default {
  getNonSensitivePatients,
  addPatient
};