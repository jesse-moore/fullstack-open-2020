import React from 'react';
import { HealthRatingSelection, HealthCheckFormProps } from './FormField';

const HealthCheckForm: React.FC<HealthCheckFormProps> = ({
    setFieldValue,
    setFieldTouched,
}) => {
    return (
        <>
            <HealthRatingSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
            />
        </>
    );
};

export default HealthCheckForm;
