import { State } from './state';
import { Patient, Diagnosis, Entry } from '../types';

export type Action =
    | {
          type: 'SET_PATIENT_LIST';
          payload: Patient[];
      }
    | {
          type: 'ADD_PATIENT';
          payload: Patient;
      }
    | { type: 'UPDATE_PATIENT'; payload: Patient }
    | { type: 'SET_DIAGNOSIS_LIST'; payload: Diagnosis[] }
    | { type: 'ADD_ENTRY'; payload: { entry: Entry; id: string } };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_PATIENT_LIST':
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({ ...memo, [patient.id]: patient }),
                        {}
                    ),
                    ...state.patients,
                },
            };
        case 'SET_DIAGNOSIS_LIST':
            return {
                ...state,
                diagnosis: {
                    ...action.payload.reduce(
                        (memo, diag) => ({ ...memo, [diag.code]: diag }),
                        {}
                    ),
                    ...state.diagnosis,
                },
            };
        case 'UPDATE_PATIENT':
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: {
                        ...state.patients[action.payload.id],
                        ...action.payload,
                    },
                },
            };
        case 'ADD_PATIENT':
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload,
                },
            };
        case 'ADD_ENTRY':
            const oldEntries = state.patients[action.payload.id].entries;
            const newEntries = [...oldEntries, action.payload.entry];
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: {
                        ...state.patients[action.payload.id],
                        entries: newEntries,
                    },
                },
            };
        default:
            return state;
    }
};

export const setPatientList = (patients: Patient[]): Action => {
    return {
        type: 'SET_PATIENT_LIST',
        payload: patients,
    };
};

export const updatePatient = (patient: Patient): Action => {
    return {
        type: 'UPDATE_PATIENT',
        payload: patient,
    };
};

export const addPatient = (patient: Patient): Action => {
    return {
        type: 'ADD_PATIENT',
        payload: patient,
    };
};

export const addEntry = ({
    entry,
    id,
}: {
    entry: Entry;
    id: string;
}): Action => {
    return {
        type: 'ADD_ENTRY',
        payload: { entry, id },
    };
};

export const setDiagnosisList = (diagnosis: Diagnosis[]): Action => {
    return {
        type: 'SET_DIAGNOSIS_LIST',
        payload: diagnosis,
    };
};
