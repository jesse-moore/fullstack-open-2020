import { v4 as uuidv4 } from 'uuid';
import patientsData from '../../data/patients.json';
import toNewPatientEntry from '../utils/toNewPatientEntry';
import { PatientEntryNonSensitive, NewPatientEntry } from '../types/types';

const getNonSensitivePatientData = (): PatientEntryNonSensitive[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return { id, name, dateOfBirth, gender, occupation };
    });
};

const addEntry = (newEntry: NewPatientEntry): PatientEntryNonSensitive => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const id: string = isId(uuidv4());
    const entry = {
        id,
        ...newEntry,
    };
    patientsData.push(entry);
    const { name, dateOfBirth, gender, occupation } = toNewPatientEntry(entry);
    return { id, name, dateOfBirth, gender, occupation };
};

function isId(value: string): string {
    if (typeof value === 'string') return value;
    throw new Error();
}

export default { getNonSensitivePatientData, addEntry };
