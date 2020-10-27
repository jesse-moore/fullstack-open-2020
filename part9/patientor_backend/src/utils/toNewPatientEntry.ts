import { NewPatientEntry, Gender } from '../types/types';

export default (object: NewPatientEntry): NewPatientEntry => {
    const { name, dateOfBirth, gender, occupation, ssn } = object;
    return {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSSN(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
    };
};

const parseName = (name: string) => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing name: ${String(name)}`);
    }
    return name;
};

const parseDate = (date: string) => {
    if (!date || !isDate(date)) {
        throw new Error(`Incorrect or missing date: ${String(date)}`);
    }
    return date;
};

const parseGender = (gender: string) => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${String(gender)}`);
    }
    return gender;
};

const parseSSN = (ssn: string) => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Incorrect or missing ssn: ${String(ssn)}`);
    }
    return ssn;
};

const parseOccupation = (occupation: string) => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Incorrect or missing occupation: ${String(occupation)}`);
    }
    return occupation;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};
