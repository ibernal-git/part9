/**
 * const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newDiaryEntry = diaryService.addDiary({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  res.json(newDiaryEntry);
 */
  import { NewPatient, Patient, Gender, BaseEntry, Entry } from './types';
  import { v4 as uuidv4 } from 'uuid';

  const toNewPatient = (object: NewPatient): Patient => {
    const newPatient: Patient = {
      id: uuidv4(),
      gender: parseGender(object.gender),
      name: parseInput(object.name),
      occupation: parseInput(object.occupation),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseInput(object.ssn),
      entries: []
  };
  
    return newPatient;
  };
  const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  export const parseInput = (input: unknown): string => {
    if (!input || !isString(input)) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Incorrect or missing input: ${input}`,);
    }
    return input;
  };

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
  const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };

  const parseGender = (gender: unknown): Gender => {
      if (!gender || !isGender(gender)) {
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          throw new Error('Incorrect or missing gender: ' + gender);
      }
      return gender;
  };
  
  export default toNewPatient;

  export const toNewEntry = (object: Entry): Entry | Error => {

    const newEntry: BaseEntry = {
      id: uuidv4(),
      date: parseDate(object.date),
      specialist: parseInput(object.specialist),
      description: parseInput(object.description),
      diagnosisCodes: object.diagnosisCodes ? object.diagnosisCodes : []
    };
    
    if(object.type === undefined) {
      throw new Error('Invalid entry type');
    }
    console.log(object);

    switch (object.type) {
      case 'HealthCheck':
          if (object.healthCheckRating === undefined) {
            throw new Error('Invalid healthCheckRating');
          }
          return { ...newEntry, type: 'HealthCheck', healthCheckRating: object.healthCheckRating };
      case 'Hospital':
          if (object.discharge  === undefined) {
            throw new Error('Invalid discharge');
          }
          return { ...newEntry, type: 'Hospital', discharge: object.discharge };
      case 'OccupationalHealthcare':
          if (object.employerName  === undefined) {
            throw new Error('Invalid employerName');
          }
          return {
              ...newEntry, type: 'OccupationalHealthcare',
              employerName: object.employerName,
              sickLeave: object.sickLeave ? object.sickLeave : undefined
          };
      default:
          throw new Error("Invalid input data");
    }

};