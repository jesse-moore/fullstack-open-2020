import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField } from './FormField';
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
            {({
                values,
                isValid,
                dirty,
                setValues,
                setFieldTouched,
                setFieldValue,
            }) => {
                const type = values.type;
                return (
                    <Form className="form ui">
                        <BaseForm setValues={setValues} values={values} />
                        {type === EntryType.HealthCheck && (
                            <HealthCheckForm
                                setFieldValue={setFieldValue}
                                setFieldTouched={setFieldTouched}
                            />
                        )}
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
