import { v4 as uuidv4 } from 'uuid';
import patientsData from '../../data/patients';
import toNewPatient from '../utils/toNewPatient';
import toNewEntry from '../utils/toNewEntry';
import { parseID, parseString } from '../utils/typeChecks';
import {
    PatientEntryNonSensitive,
    NewPatientEntry,
    PatientEntry,
    Entry,
} from '../types/types';

const savedPatients: PatientEntry[] = [...patientsData];

const getNonSensitivePatientData = (): PatientEntryNonSensitive[] => {
    return savedPatients.map(
        ({ id, name, dateOfBirth, gender, occupation, entries }) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            return { id, name, dateOfBirth, gender, occupation, entries };
        }
    );
};

const addPatient = (newPatient: NewPatientEntry): PatientEntryNonSensitive => {
    const id: string = isId(uuidv4());
    const entries: Entry[] = [];
    const validatedPatient = toNewPatient(newPatient);
    savedPatients.push({ id, entries, ...validatedPatient });
    const { name, dateOfBirth, gender, occupation } = validatedPatient;
    return { id, name, dateOfBirth, gender, occupation, entries };
};

const addEntry = ({
    entry,
    patientID,
}: {
    entry: Entry;
    patientID: string;
}): Entry => {
    if (
        !patientID ||
        !parseString(patientID, 'patient id') ||
        !parseID(patientID)
    ) {
        throw new Error(
            `Incorrect or missing patient id: ${String(patientID)}`
        );
    }
    const patient = savedPatients.find((p) => p.id === patientID);
    if (!patient) {
        throw new Error(`Patient not found Patient ID: ${String(patientID)}`);
    }
    const validatedEntry = toNewEntry(entry);
    savedPatients.forEach((p, i) => {
        if (p.id === patientID) {
            const entries = p.entries;
            savedPatients[i] = { ...p, entries: [...entries, validatedEntry] };
        }
    });

    return validatedEntry;
};

function isId(value: string): string {
    if (typeof value === 'string') return value;
    throw new Error();
}

function getPatientByID(id: string): PatientEntryNonSensitive | undefined {
    const patient = savedPatients.find((patient) => id === patient.id);
    if (!patient) throw Error('Patient not found');
    const { name, dateOfBirth, gender, occupation, entries } = patient;
    return { id, name, dateOfBirth, gender, occupation, entries };
}

export default {
    getNonSensitivePatientData,
    addPatient,
    getPatientByID,
    addEntry,
};
