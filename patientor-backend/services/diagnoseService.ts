import diagnosesData from '../data/diagnoses.json';
import { DiagnoseEntry } from '../types';

const getEntries = (): DiagnoseEntry[] => {
  return diagnosesData;
};

export default {
  getEntries
};