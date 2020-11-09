import React from 'react';
import { Field } from 'formik';
import { TextField } from './FormField';
import { Header } from 'semantic-ui-react';

const HospitalForm: React.FC<{ show: boolean }> = ({ show }) => {
    if (!show) return null;
    return (
        <>
            <Header size="small">Discharge</Header>
            <Field
                label="Date"
                placeholder="Discharge Date"
                name="discharge.date"
                component={TextField}
            />
            <Field
                label="Criteria"
                placeholder="Discharge Criteria"
                name="discharge.criteria"
                component={TextField}
            />
        </>
    );
};

export default HospitalForm;
