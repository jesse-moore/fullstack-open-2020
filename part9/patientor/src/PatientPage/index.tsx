import React from 'react';
import { useParams } from 'react-router-dom';
import { Icon, Header, List } from 'semantic-ui-react';
import { useStateValue } from '../state';
import EntryDetails from './Entries';

const PatientPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }] = useStateValue();

    const patient = patients[id];
    if (!patient) return null;
    return (
        <div>
            <Header size="large">
                {patient.name}
                <Icon name="mars" />
            </Header>
            <List>
                <List.Item>
                    <strong>Date of Birth: </strong>
                    {patient.dateOfBirth}
                </List.Item>
                <List.Item>
                    <strong>Gender: </strong>
                    {patient.gender}
                </List.Item>
                <List.Item>
                    <strong>Occupation: </strong>
                    {patient.occupation}
                </List.Item>
            </List>
            <Header.Subheader as="h3">Entries</Header.Subheader>
            {patient.entries.map((entry) => (
                <EntryDetails entry={entry} key={entry.id} />
            ))}
        </div>
    );
};

export default PatientPage;
