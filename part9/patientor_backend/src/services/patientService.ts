import { v4 as uuidv4 } from 'uuid';
import patientsData from '../../data/patients.json';
import toNewPatientEntry from '../utils/toNewPatientEntry';
import {
    PatientEntryNonSensitive,
    NewPatientEntry,
    PatientEntry,
    Entry,
} from '../types/types';

const savedPatients: PatientEntry[] = [...patientsData];

const getNonSensitivePatientData = (): PatientEntryNonSensitive[] => {
    return patientsData.map(
        ({ id, name, dateOfBirth, gender, occupation, entries }) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            return { id, name, dateOfBirth, gender, occupation, entries };
        }
    );
};

const addEntry = (newEntry: NewPatientEntry): PatientEntryNonSensitive => {
    const id: string = isId(uuidv4());
    const entries: Entry[] = [];
    const entry = {
        id,
        entries,
        ...newEntry,
    };
    savedPatients.push(entry);
    const { name, dateOfBirth, gender, occupation } = toNewPatientEntry(entry);
    return {
        id,
        name,
        dateOfBirth,
        gender,
        occupation, 
        entries,
    };
};

function isId(value: string): string {
    if (typeof value === 'string') return value;
    throw new Error();
}

function getPatientByID(id: string): PatientEntryNonSensitive | undefined {
    const patient = savedPatients.find((patient) => id === patient.id);
    return patient;
}

export default { getNonSensitivePatientData, addEntry, getPatientByID };
