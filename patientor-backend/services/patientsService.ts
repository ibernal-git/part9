import patientsData from '../data/patients.json';
import { NonSensitivePatient, Patient } from '../types';

const patients: Patient[] = patientsData as Patient[];

const getNonSensitivePatients = (): NonSensitivePatient [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = ( data: Patient ): Patient => {
  
  const newPatientData = data;
  patients.push(newPatientData);

  return newPatientData;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);

  if (!patient) {
    throw new Error("No patient found");
  }

  return patient;
};

export default {
  getNonSensitivePatients,
  addPatient,
  getPatient
};