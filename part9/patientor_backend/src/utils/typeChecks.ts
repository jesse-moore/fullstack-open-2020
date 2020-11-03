import { validate as uuidValidate } from 'uuid';

const parseDate = (date: string): string => {
    if (!date || !isDate(date)) {
        throw new Error(`Incorrect or missing date: ${String(date)}`);
    }
    return date;
};

const parseString = (string: string, name: string): string => {
    if (!string || !isString(string)) {
        throw new Error(
            `Incorrect or missing ${String(name)}: ${String(string)}`
        );
    }
    return string;
};

const parseID = (id: string): string => {
    if (!uuidValidate(id)) {
        throw new Error(`Incorrect or missing id: ${String(id)}`);
    }
    return id;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export { parseDate, parseString, parseID };
