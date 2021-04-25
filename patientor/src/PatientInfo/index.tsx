import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import { Header, List, Icon, Button } from "semantic-ui-react";

import { Patient } from '../types';

import { useStateValue, getPatient, addEntry } from "../state";
import Entries from './Entries';

import AddEntryModal from '../AddEntryModal';
import { EntryForm } from '../types';

const PatientInfo = () => {

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  useEffect(() => {

    const getPatientInfo = async () => {

      if (!patients[id] || !patients[id].ssn) {
        try {
          const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
          console.log(patient);
          if (!patient) {
            return (<div>no patient found</div>);
          }
          dispatch(getPatient(patient));
        } catch (e) {
          const error = e as Error;
          return (<div>{`error: ${error.message}`}</div>);
        }
      }
    };
    void getPatientInfo();
  }, [dispatch]);

  if (!patients[id]) {
    return (
      <div>error</div>
    );
  }

  const handleSubmitEntry = async (newData: EntryForm) => {

    try {
      let returnedPatient;

      if (newData.dischargeDate || newData.dischargeCriteria) {
        const newEntry = {...newData, discharge: {date: newData.dischargeDate, criteria: newData.dischargeCriteria}};
        const { data: newPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${id}/entries`,
          newEntry
        );
        returnedPatient = newPatient;
      } else {
        const { data: newPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${id}/entries`,
          newData
        );
        returnedPatient = newPatient;
      }
      
      dispatch(addEntry(returnedPatient));
      closeModal();
      // console.log(patients);
      // console.log(patients[id]);
    } catch (e) {
      setError(e.response.data.error);
    }
  };

  return (
    <div>
      <Header as="h2">{patients[id].name}
      {
        patients[id].gender === 'other' 
        ? <Icon name='genderless' /> 
        : patients[id].gender === 'female' 
          ? <Icon name='venus' /> 
          : <Icon name='mars' />
      }
      </Header>
      <List>
        <List.Item>ssn: {patients[id].ssn}</List.Item>
        <List.Item>occupation: {patients[id].occupation}</List.Item>
        <List.Item>gender: {patients[id].gender}</List.Item>
      </List>
      <Entries entries={patients[id].entries} />
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={handleSubmitEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add Entry</Button>
    </div>
  );
};

export default PatientInfo;