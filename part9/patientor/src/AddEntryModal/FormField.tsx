import React, { useEffect } from 'react';
import {
    ErrorMessage,
    Field,
    FieldProps,
    FormikProps,
    useFormikContext,
} from 'formik';
import { Dropdown, DropdownProps, Form } from 'semantic-ui-react';
import { EntryType, Entry, HealthCheckRating } from '../types';

export type EntryFormValues = Omit<Entry, 'id'>;

// structure of a single option
export type EntryOption = {
    value: EntryType;
    label: string;
};

// props for select field component
interface EntryTypeSelectFieldProps {
    name: string;
    label: string;
    options: EntryOption[];
}

export const SelectField: React.FC<EntryTypeSelectFieldProps> = ({
    name,
    label,
    options,
}: EntryTypeSelectFieldProps) => {
    const {
        values,
        setValues,
    }: FormikProps<EntryFormValues> = useFormikContext();
    useEffect(() => {
        const { description, date, specialist, type } = values;
        setValues({ description, date, specialist, type });
    }, [values.type]);

    return (
        <Form.Field>
            <label>{label}</label>
            <Field as="select" name={name} className="ui dropdown">
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label || option.value}
                    </option>
                ))}
            </Field>
        </Form.Field>
    );
};

interface TextProps extends FieldProps {
    label: string;
    placeholder: string;
}

export const TextField: React.FC<TextProps> = ({
    field,
    label,
    placeholder,
}) => (
    <Form.Field>
        <label>{label}</label>
        <Field placeholder={placeholder} {...field} />
        <div style={{ color: 'red' }}>
            <ErrorMessage name={field.name} />
        </div>
    </Form.Field>
);

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
    label: string;
    errorMessage?: string;
    min: number;
    max: number;
}

export const NumberField: React.FC<NumberProps> = ({
    field,
    label,
    min,
    max,
}) => (
    <Form.Field>
        <label>{label}</label>
        <Field {...field} type="number" min={min} max={max} />

        <div style={{ color: 'red' }}>
            <ErrorMessage name={field.name} />
        </div>
    </Form.Field>
);

interface HealthRatingOption {
    value: HealthCheckRating;
    text: string;
}

const options: HealthRatingOption[] = [
    { value: HealthCheckRating.CriticalRisk, text: 'Critical Risk' },
    { value: HealthCheckRating.HighRisk, text: 'High Risk' },
    { value: HealthCheckRating.LowRisk, text: 'Low Risk' },
    { value: HealthCheckRating.Healthy, text: 'Healthy' },
];

export interface HealthCheckFormProps {
    setFieldValue: FormikProps<{
        healthCheckRating: HealthCheckRating;
    }>['setFieldValue'];
    setFieldTouched: FormikProps<{
        healthCheckRating: HealthCheckRating;
    }>['setFieldTouched'];
}

export const HealthRatingSelection = ({
    setFieldValue,
    setFieldTouched,
}: HealthCheckFormProps) => {
    const field = 'healthCheckRating';
    const onChange = (
        _event: React.SyntheticEvent<HTMLElement, Event>,
        data: DropdownProps
    ) => {
        setFieldTouched(field, true);
        setFieldValue(field, data.value);
    };

    return (
        <Form.Field>
            <label>Diagnoses</label>
            <Dropdown
                fluid
                multiple
                search
                selection
                options={options}
                onChange={onChange}
            />
            <ErrorMessage name={field} />
        </Form.Field>
    );
};
