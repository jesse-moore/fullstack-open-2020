import React from 'react';
import { useParams } from 'react-router-dom';
import { Icon, Header, List, Button } from 'semantic-ui-react';
import { useStateValue } from '../state';
import EntryDetails from './Entries';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const PatientPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }] = useStateValue();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            console.log(values);
            // const { data: newPatient } = await axios.post<Patient>(
            // 	`${apiBaseUrl}/patients`,
            // 	values
            // );
            // dispatch(addPatient(newPatient));
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
