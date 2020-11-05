import React from 'react';
import { Field, FormikProps } from 'formik';

import { TextField, SelectField, EntryOption } from './FormField';
import { EntryType, Entry } from '../types';

export type EntryFormValues = Omit<Entry, 'id'>;

interface Props {
    setValues: FormikProps<EntryFormValues>;
    values: EntryFormValues;
}

const entryTypes: EntryOption[] = [
    { value: EntryType.HealthCheck, label: 'Health Check' },
    { value: EntryType.Hospital, label: 'Hospital' },
    {
        value: EntryType.OccupationalHealthcare,
        label: 'Occupational Healthcare',
    },
];

const BaseForm: React.FC<Props> = ({ values, setValues }) => {
    return (
        <>
            <SelectField
                label="Entry Type"
                name="type"
                options={entryTypes}
                values={values}
                setValues={setValues}
            />
            <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
            />
            <Field
                label="Date"
                placeholder="Date"
                name="date"
                component={TextField}
            />
            <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
            />
        </>
    );
};

export default BaseForm;
