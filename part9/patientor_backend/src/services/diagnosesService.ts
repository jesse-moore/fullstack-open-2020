import diagnosesData from '../../data/diagnoses.json';
import { DiagnosesEntry } from '../types/types';

const getEntries = (): Array<DiagnosesEntry> => {
    return diagnosesData;
};

export default { getEntries };
