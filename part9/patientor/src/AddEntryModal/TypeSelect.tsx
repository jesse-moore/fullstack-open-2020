import React, { Dispatch, SetStateAction } from 'react';
import { FormikProps, useFormikContext, FormikContextType } from 'formik';
import { Dropdown, DropdownProps, Form } from 'semantic-ui-react';
import { EntryType } from '../types';
import { EntryFormValues } from './AddEntryForm';

// structure of a single option
type EntryOption = {
    value: EntryType;
    text: string;
};

const options: EntryOption[] = [
    { value: EntryType.HealthCheck, text: 'Health Check' },
    { value: EntryType.Hospital, text: 'Hospital' },
    {
        value: EntryType.OccupationalHealthcare,
        text: 'Occupational Healthcare',
    },
];

interface Props {
    setType: Dispatch<SetStateAction<EntryType>>;
}

type ValuesType = FormikContextType<EntryFormValues>;

interface SelectFormType {
    setValues: FormikProps<EntryFormValues>['setValues'];
    setFieldValue: FormikProps<{
        type: EntryType;
    }>['setFieldValue'];
    setFieldTouched: FormikProps<{
        type: EntryType;
    }>['setFieldTouched'];
}

const TypeSelect: React.FC<Props> = ({ setType }) => {
    const {
        values,
        setFieldTouched,
        setFieldValue,
        setValues,
    }: ValuesType & SelectFormType = useFormikContext();

    const field = 'type';

    const onChange = (
        _event: React.SyntheticEvent<HTMLElement, Event>,
        data: DropdownProps
    ) => {
        const { description, date, specialist } = values;
        const validOption = options.find(
            (option) => option.value === data.value
        );
        if (validOption === undefined) return;
        const type = validOption.value;
        setValues({ description, date, specialist, type });
        setType(type);
        setFieldTouched(field, true);
        setFieldValue(field, type);
    };

    return (
        <Form.Field>
            <label>Entry Type</label>
            <Dropdown
                fluid
                placeholder="Select Entry Type"
                selection
                options={options}
                onChange={onChange}
            />
        </Form.Field>
    );
};

export default TypeSelect;
