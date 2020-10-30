import diagnosesData from '../../data/diagnoses.json';
import { DiagnosisEntry } from '../types/types';

const getEntries = (): Array<DiagnosisEntry> => {
    return diagnosesData;
};

export default { getEntries };
