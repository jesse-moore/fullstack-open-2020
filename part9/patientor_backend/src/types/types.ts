export interface DiagnosesEntry {
    code: string;
    name: string;
    latin?: string;
}

interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

export type PatientEntryNonSensitive = Omit<PatientEntry, 'ssn'>;
