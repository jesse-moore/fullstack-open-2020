import React, { useState } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField } from './FormField';
import TypeSelect from './TypeSelect';
import BaseForm from './BaseForm';
import HealthCheckForm from './HealthCheckForm';
import { EntryType, Entry } from '../types';

/*
 * use type Entry, but omit id,
 * because those are irrelevant for new entry object.
 */
export type EntryFormValues = Omit<Entry, 'id'>;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [type, setType] = useState<EntryType>(EntryType.HealthCheck);
    return (
        <Formik
            initialValues={{
                description: '',
                date: '',
                specialist: '',
                type,
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
                return (
                    <Form className="form ui">
                        <TypeSelect setType={setType} />
                        <BaseForm />
                        {type === EntryType.HealthCheck && <HealthCheckForm />}
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
