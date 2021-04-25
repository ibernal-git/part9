import React from 'react';
import { EntryDetailsProps } from '../types';
import { useStateValue } from '../state';
import { Header, List, Icon } from 'semantic-ui-react';

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry }) => {

  const [{ diagnoses }] = useStateValue();

  const showRatingIcon = (rating: number) => {
    switch (rating) {
      case 0:
        return <Icon color='green' name='heart' />;
      case 1:
        return <Icon color='yellow' name='heart' />;
      case 2:
        return <Icon color='orange' name='heart' />;
      case 3:
        return <Icon color='red' name='heart' />;
      default:
        break;
    }
  };
  const entryStyle = {
    padding: 10,
    marginBottom: 20,
    border: '1px solid rgba(0, 0, 0, 0.25)', 
  };

  switch (entry.type) {
      case "Hospital":
          return (
            <div style={entryStyle}>
              <Header as="h4">{entry.date} <Icon name='hospital' /></Header>
              <p>{entry.description}</p>
              <p>Date: {entry.discharge.date}</p>
              <p>Criteria: {entry.discharge.criteria}</p>
              <List bulleted>
                {entry.diagnosisCodes?.map(code =>
                  <List.Item key={code}>
                    {code}: {diagnoses.find(d => d.code === code)?.name}
                  </List.Item>)}
              </List>
            </div>
          );
      case "OccupationalHealthcare":
        return (
          <div style={entryStyle}>
            <Header as="h4">{entry.date} <Icon name='stethoscope' /> {entry.employerName}</Header>
            <p>{entry.description}</p>
            <List bulleted>
              {entry.diagnosisCodes?.map(code =>
                <List.Item key={code}>
                  {code}: {diagnoses.find(d => d.code === code)?.name}
                </List.Item>)}
            </List>
        </div>
        );
      case "HealthCheck":
        return (
          <div style={entryStyle}>
            <Header as="h4">{entry.date} <Icon name='user md' /></Header>
            <p>{entry.description}</p>
            <p>
              {showRatingIcon(entry.healthCheckRating)}
            </p>
            <List bulleted>
              {entry.diagnosisCodes?.map(code =>
                <List.Item key={code}>
                  {code}: {diagnoses.find(d => d.code === code)?.name}
                </List.Item>)}
            </List>
        </div>
        );
      default:
        return null;
  }
};

export default EntryDetails;