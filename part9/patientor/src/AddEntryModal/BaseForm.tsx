import React, { useEffect, Dispatch, SetStateAction } from 'react';
import { Field, FormikProps, useFormikContext } from 'formik';
import { Dropdown, DropdownProps, Form } from 'semantic-ui-react';
import { TextField, SelectField } from './FormField';
import { EntryType, Entry } from '../types';

export type EntryFormValues = Omit<Entry, 'id'>;

const entryTypes: EntryOption[] = [
    { value: EntryType.HealthCheck, label: 'Health Check' },
    { value: EntryType.Hospital, label: 'Hospital' },
    {
        value: EntryType.OccupationalHealthcare,
        label: 'Occupational Healthcare',
    },
];

// structure of a single option
type EntryOption = {
    value: EntryType;
    label: string;
};

interface Props {
    setType: Dispatch<SetStateAction<EntryType>>;
}

const BaseForm: React.FC<Props> = ({ setType }) => {
    const {
        values,
        setValues,
    }: FormikProps<EntryFormValues> = useFormikContext();
    useEffect(() => {
        const { description, date, specialist, type } = values;
        setValues({ description, date, specialist, type });
        setType(type);
    }, [values.type]);

    return (
        <>
            <Form.Field>
                <label>Entry Type</label>
                <Field as="select" name="type" className="ui dropdown">
                    {entryTypes.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label || option.value}
                        </option>
                    ))}
                </Field>
            </Form.Field>
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
