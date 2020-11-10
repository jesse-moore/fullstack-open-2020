import React, { useState } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import TypeSelect from './TypeSelect';
import BaseForm from './BaseForm';
import HealthCheckForm from './HealthCheckForm';
import HospitalForm from './HospitalForm';
import OccupationalHealthcareForm from './OccupationalHealthcareForm';
import {
    EntryType,
    NewEntry,
    HealthCheckEntry,
    HospitalEntry,
    OccupationalHealthcareEntry,
} from '../types';

/*
 * use type Entry, but omit id,
 * because those are irrelevant for new entry object.
 */

interface Props {
    onSubmit: (values: NewEntry) => void;
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

const hospitalInitialValues: Omit<HospitalEntry, 'id'> = {
    ...baseInitialValues,
    type: EntryType.Hospital,
    discharge: { date: '', criteria: '' },
};

const validateBase = (values: NewEntry) => {
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

const validateHealthCheck = (values: Omit<HealthCheckEntry, 'id'>) => {
    const requiredError = 'Field is required';
    const errors: { [field: string]: string } = {};
    const baseErrors = validateBase(values);
    if (!values.healthCheckRating) {
        errors.healthCheckRating = requiredError;
    }
    return { ...baseErrors, ...errors };
};

const validateHospital = (values: Omit<HospitalEntry, 'id'>) => {
    const requiredError = 'Field is required';
    const errors: { [field: string]: string } = {};
    const baseErrors = validateBase(values);
    if (!values.discharge.date) {
        errors.date = requiredError;
    }
    if (!values.discharge.criteria) {
        errors.criteria = requiredError;
    }
    return { ...baseErrors, discharge: errors };
};

const validateOccupationalHealth = (
    values: Omit<OccupationalHealthcareEntry, 'id'>
) => {
    const requiredError = 'Field is required';
    const errors: { [field: string]: string } = {};
    const baseErrors = validateBase(values);
    if (!values.employerName) {
        errors.employerName = requiredError;
    }
    return { ...baseErrors, ...errors };
};

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [type, setType] = useState<EntryType>(EntryType.HealthCheck);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const FormComponent = ({
        initialValues,
        validation,
    }: {
        initialValues: NewEntry;
        validation: any;
    }) => {
        return (
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validate={validation}
                // enableReinitialize={true}
            >
                {({ isValid, dirty }) => {
                    const showForm = {
                        healthCheck: type === EntryType.HealthCheck,
                        hospital: type === EntryType.Hospital,
                        occupationalHealthcare:
                            type === EntryType.OccupationalHealthcare,
                    };
                    return (
                        <Form className="form ui">
                            <TypeSelect setType={setType} type={type} />
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
    switch (type) {
        case EntryType.HealthCheck:
            return (
                <FormComponent
                    initialValues={healthCheckInitialValues}
                    validation={validateHealthCheck}
                />
            );
        case EntryType.Hospital:
            return (
                <FormComponent
                    initialValues={hospitalInitialValues}
                    validation={validateHospital}
                />
            );
        case EntryType.OccupationalHealthcare:
            return (
                <FormComponent
                    initialValues={occupationalHealthCareIntitialValues}
                    validation={validateOccupationalHealth}
                />
            );
        default:
            throw Error('Not Initialized');
    }
};

export default AddEntryForm;
