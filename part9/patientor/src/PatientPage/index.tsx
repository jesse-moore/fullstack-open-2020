import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon, Header, List, Button } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { useStateValue, addEntry } from '../state';
import EntryDetails from './Entries';
import AddEntryModal from '../AddEntryModal';
import { NewEntry, Entry } from '../types';

const PatientPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: NewEntry) => {
        try {
            const { data: entry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            dispatch(addEntry({ entry, id }));
            closeModal();
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    };

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
            <AddEntryModal
                modalOpen={modalOpen}
                error={error}
                onClose={closeModal}
                onSubmit={submitNewEntry}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>
            <Header.Subheader as="h3">Entries</Header.Subheader>
            {patient.entries.map((entry) => (
                <EntryDetails entry={entry} key={entry.id} />
            ))}
        </div>
    );
};

export default PatientPage;
