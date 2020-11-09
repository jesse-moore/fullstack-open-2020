import React from 'react';
import { Field, FormikProps, ErrorMessage, useFormikContext } from 'formik';
import { Dropdown, DropdownProps, Form } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Diagnosis } from '../types';
import { TextField } from './FormField';

interface BaseFormType {
    setFieldValue: FormikProps<{ diagnosisCodes: string[] }>['setFieldValue'];
    setFieldTouched: FormikProps<{
        diagnosisCodes: string[];
    }>['setFieldTouched'];
}

const BaseForm: React.FC = () => {
    const field = 'diagnosisCodes';
    const { setFieldTouched, setFieldValue }: BaseFormType = useFormikContext();
    const [{ diagnosis }] = useStateValue();
    const onChange = (
        _event: React.SyntheticEvent<HTMLElement, Event>,
        data: DropdownProps
    ) => {
        setFieldTouched(field, true);
		setFieldValue(field, data.value);
    };

    const stateOptions = Object.keys(diagnosis).map((code) => {
        const name = diagnosis[code].name;
        return {
            key: code,
            text: `${name} (${code})`,
            value: code,
        };
	});
	
    return (
        <>
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
            <Form.Field>
                <label>Diagnoses</label>
                <Dropdown
                    fluid
                    multiple
                    search
                    selection
                    options={stateOptions}
                    onChange={onChange}
                />
                <ErrorMessage name={field} />
            </Form.Field>
        </>
    );
};

export default BaseForm;
