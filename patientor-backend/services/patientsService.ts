import patients from '../data/patients';
import { NonSensitivePatient, Patient, Entry } from '../types';

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

const addEntry = (id: string, newEntry: Entry): Patient | Error => {

  const updatePatient = patients.find(patient => patient.id === id);
  if (!updatePatient) {
      return new Error("Something went wrong");
  }
  updatePatient?.entries.push(newEntry);
  return updatePatient;
};

export default {
  getNonSensitivePatients,
  addPatient,
  getPatient,
  addEntry
};