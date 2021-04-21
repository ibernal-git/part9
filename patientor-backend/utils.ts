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
  import { NewPatient, Patient, Gender } from './types';
  import { v4 as uuidv4 } from 'uuid';

  const toNewPatient = (object: NewPatient): Patient => {
    const newPatient: Patient = {
      id: uuidv4(),
      gender: parseGender(object.gender),
      name: parseInput(object.name),
      occupation: parseInput(object.occupation),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseInput(object.ssn)
  };
  
    return newPatient;
  };
  const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  const parseInput = (input: unknown): string => {
    if (!input || !isString(input)) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Incorrect or missing gender: ${input}`,);
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