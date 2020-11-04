import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, SelectField, EntryOption } from './FormField';
import { EntryType, BaseEntry, Entry } from '../types';

/*
 * use type Entry, but omit id,
 * because those are irrelevant for new entry object.
 */
export type EntryFormValues = Omit<Entry, 'id'>;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const entryTypes: EntryOption[] = [
    { value: EntryType.HealthCheck, label: 'Health Check' },
    { value: EntryType.Hospital, label: 'Hospital' },
    {
        value: EntryType.OccupationalHealthcare,
        label: 'Occupational Healthcare',
    },
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    return (
        <Formik
            initialValues={{
                description: '',
                date: '',
                specialist: '',
                type: EntryType.HealthCheck,
            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = 'Field is required';
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.type) {
                    errors.type = requiredError;
                }
                return errors;
            }}
        >
            {({ values, isValid, dirty }) => {
                console.log(values);
                return (
                    <Form className="form ui">
                        <SelectField
                            label="Entry Type"
                            name="type"
                            options={entryTypes}
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
                        {values.type === EntryType.OccupationalHealthcare && (
                            <Field
                                label="Employer Name"
                                placeholder="Employer Name"
                                name="employerName"
                                component={TextField}
                            />
                        )}
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button
                                    type="button"
                                    onClick={onCancel}
                                    color="red"
                                >
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;
