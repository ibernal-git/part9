export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}
export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}
export interface Entry {
  entry?: string;
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}
