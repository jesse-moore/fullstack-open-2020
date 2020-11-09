import React, { useState } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Formik, Form, FormikProps } from 'formik';
import TypeSelect from './TypeSelect';
import BaseForm from './BaseForm';
import HealthCheckForm from './HealthCheckForm';
import HospitalForm from './HospitalForm';
import OccupationalHealthcareForm from './OccupationalHealthcareForm';
import {
    EntryType,
    Entry,
    HealthCheckEntry,
    HospitalEntry,
    OccupationalHealthcareEntry,
} from '../types';

/*
 * use type Entry, but omit id,
 * because those are irrelevant for new entry object.
 */
export type EntryFormValues = Omit<Entry, 'id'>;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const baseInitialValues = {
    description: '',
    date: '',
    specialist: '',
    type: EntryType.HealthCheck,
    diagnosisCodes: [],
};

const healthCheckInitialValues: Omit<HealthCheckEntry, 'id'> = {
    ...baseInitialValues,
    type: EntryType.HealthCheck,
    healthCheckRating: 0,
};

const occupationalHealthCareIntitialValues: Omit<
    OccupationalHealthcareEntry,
    'id'
> = {
    ...baseInitialValues,
    type: EntryType.OccupationalHealthcare,
    employerName: '',
    sickLeave: { startDate: '', endDate: '' },
};

const hospitalIntitialValues: Omit<HospitalEntry, 'id'> = {
    ...baseInitialValues,
    type: EntryType.Hospital,
    discharge: { date: '', criteria: '' },
};

const validation = (values: EntryFormValues) => {
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
};

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [type, setType] = useState<EntryType>(EntryType.HealthCheck);
    const initialValues = (() => {
        switch (type) {
            case EntryType.HealthCheck:
                return healthCheckInitialValues;
            case EntryType.Hospital:
                return hospitalIntitialValues;
            case EntryType.OccupationalHealthcare:
                return occupationalHealthCareIntitialValues;
            default:
                return baseInitialValues;
        }
    })();
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validation}
        >
            {({ isValid, dirty, touched }) => {
                const entryTypeTouched = touched.type || false;
                const showForm = {
                    healthCheck:
                        entryTypeTouched && type === EntryType.HealthCheck,
                    hospital: entryTypeTouched && type === EntryType.Hospital,
                    occupationalHealthcare:
                        entryTypeTouched &&
                        type === EntryType.OccupationalHealthcare,
                };
                return (
                    <Form className="form ui">
                        <TypeSelect setType={setType} />
                        <BaseForm />
                        <HealthCheckForm show={showForm.healthCheck} />
                        <HospitalForm show={showForm.hospital} />
                        <OccupationalHealthcareForm
                            show={showForm.occupationalHealthcare}
                        />
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
