import { v4 as uuidv4 } from 'uuid';
import {
    Entry,
    EntryType,
    BaseEntry,
    HealthCheckRating,
    OccupationalHealthcareEntry,
} from '../types/types';

export default (object: Entry): Entry => {
    const baseEntry = toBaseEntry(object);
    switch (object.type) {
        case EntryType.HealthCheck:
            return {
                type: EntryType.HealthCheck,
                healthCheckRating: parseHealthCheckRating(
                    object.healthCheckRating
                ),
                ...baseEntry,
            };
        case 'Hospital':
            return {
                type: EntryType.Hospital,
                discharge: parseDischarge(object.discharge),
                ...baseEntry,
            };
        case 'OccupationalHealthcare':
            const occupEntry: OccupationalHealthcareEntry = {
                type: EntryType.OccupationalHealthcare,
                employerName: parseString(object.employerName, 'employer name'),
                ...baseEntry,
            };
            if (object.sickLeave) {
                occupEntry.sickLeave = parseSickLeave(object.sickLeave);
            }
            return occupEntry;
        default:
            throw new Error(`Incorrect or missing parameters`);
    }
};

const toBaseEntry = (object: BaseEntry): BaseEntry => {
    const id: string = isId(uuidv4());
    const baseEntry: BaseEntry = {
        id,
        date: parseDate(object.date),
        description: parseString(object.description, 'description'),
        specialist: parseString(object.specialist, 'specialist'),
    };
    if (object.diagnosisCodes) {
        baseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    }
    return baseEntry;
};

const parseSickLeave = (sickLeave: { startDate: string; endDate: string }) => {
    const { startDate, endDate } = sickLeave;
    if (!startDate || !endDate || !isString(startDate) || isString(endDate)) {
        throw new Error(
            `Incorrect or missing sick leave start date or end date: ${String(
                sickLeave
            )}`
        );
    }
    return { startDate, endDate };
};

const parseDischarge = (discharge: { date: string; criteria: string }) => {
    if (!discharge) {
        throw new Error(`Incorrect or missing discharge: ${String(discharge)}`);
    }
    const { date, criteria } = discharge;
    if (!date || !isString(date)) {
        throw new Error(`Incorrect or missing discharge date: ${String(date)}`);
    }
    if (!criteria || !isString(criteria)) {
        throw new Error(
            `Incorrect or missing discharge criteria: ${String(criteria)}`
        );
    }
    return { date, criteria };
};

const parseHealthCheckRating = (rating: number) => {
    if (!rating || !isHealthCheckRating(rating)) {
        throw new Error(
            `Incorrect or missing health check rating: ${String(rating)}`
        );
    }
    return rating;
};

const parseDate = (date: string) => {
    if (!date || !isDate(date)) {
        throw new Error(`Incorrect or missing date: ${String(date)}`);
    }
    return date;
};

const parseString = (string: string, name: string) => {
    if (!string || !isString(string)) {
        throw new Error(
            `Incorrect or missing ${String(name)}: ${String(string)}`
        );
    }
    return string;
};

const parseDiagnosisCodes = (diagnosisCodes: string[]) => {
    if (!Array.isArray(diagnosisCodes)) {
        throw new Error(`Incorrect diagnosis codes`);
    }
    const validatedCodes = diagnosisCodes.map((code: string) => {
        if (!code || !isString(code))
            throw new Error(`Incorrect diagnosis code: ${code}`);
        return code;
    });
    return validatedCodes;
};

function isId(value: string): string {
    if (typeof value === 'string') return value;
    throw new Error();
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(rating);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};
