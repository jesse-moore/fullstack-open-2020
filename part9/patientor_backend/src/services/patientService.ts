import patientsData from '../../data/patients.json';
import { PatientEntryNonSensitive } from '../types/types';

const getNonSensitivePatientData = (): PatientEntryNonSensitive[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return { id, name, dateOfBirth, gender, occupation };
    });
};

export default { getNonSensitivePatientData };
