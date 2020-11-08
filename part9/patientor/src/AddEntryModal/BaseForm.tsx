import React from 'react';
import { Field } from 'formik';
import { TextField } from './FormField';

const BaseForm: React.FC = () => {
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
        </>
    );
};

export default BaseForm;
