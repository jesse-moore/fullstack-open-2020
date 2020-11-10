import React from 'react';
import { Field } from 'formik';
import { TextField } from './FormField';
import { Header } from 'semantic-ui-react';

const OccupationalHealthcareForm: React.FC<{ show: boolean }> = ({ show }) => {
    if (!show) return null;
    return (
        <>
            <Field
                label="Employer"
                placeholder="Employer"
                name="employerName"
                component={TextField}
            />
            <Header size="small">Sick Leave</Header>
            <Field
                label="Start Date"
                placeholder="Start Date"
                name="sickLeave.startDate"
                component={TextField}
            />
            <Field
                label="End Date"
                placeholder="End Date"
                name="sickLeave.endDate"
                component={TextField}
            />
        </>
    );
};

export default OccupationalHealthcareForm;
