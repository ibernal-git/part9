import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient, { parseInput } from '../utils';
const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());

});

patientsRouter.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }

});

patientsRouter.get('/:id', (req, res) => {
  try {

    const id = parseInput(req.params.id);
    res.send(patientsService.getPatient(id));

  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(404).send(e.message);
  }
  

});

export default patientsRouter;
