import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import { Header, List, Icon } from "semantic-ui-react";

import { Patient } from '../types';

import { useStateValue, getPatient } from "../state";
import Entries from './Entries';

const PatientInfo = () => {

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
  // mars

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
    </div>
  );
};

export default PatientInfo;