import React from 'react';
import { Header } from 'semantic-ui-react';
import { EntriesProps } from '../types';
import EntryDetails from './EntryDetails';


const Entries: React.FC<EntriesProps> = ({entries}) => {

  if (!entries) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <Header as="h3">entries</Header>
      {entries.map(entry => {
        return (
          <div key={entry.id}>
            <EntryDetails entry={entry} />
          </div>
        );
      })}
    </div>
  );
};

export default Entries;