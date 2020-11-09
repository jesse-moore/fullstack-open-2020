import React from 'react';
import { useFormikContext, ErrorMessage, FormikProps } from 'formik';
import { Dropdown, DropdownProps, Form } from 'semantic-ui-react';
import { HealthCheckRating } from '../types';

interface HealthRatingOption {
    value: HealthCheckRating;
    text: string;
}

const options: HealthRatingOption[] = [
    { value: HealthCheckRating.CriticalRisk, text: 'Critical Risk' },
    { value: HealthCheckRating.HighRisk, text: 'High Risk' },
    { value: HealthCheckRating.LowRisk, text: 'Low Risk' },
    { value: HealthCheckRating.Healthy, text: 'Healthy' },
];

interface HealthCheckFormType {
    setFieldValue: FormikProps<{
        healthCheckRating: HealthCheckRating;
    }>['setFieldValue'];
    setFieldTouched: FormikProps<{
        healthCheckRating: HealthCheckRating;
    }>['setFieldTouched'];
}

const HealthCheckForm: React.FC<{ show: boolean }> = ({ show }) => {
    const {
        setFieldTouched,
        setFieldValue,
    }: HealthCheckFormType = useFormikContext();

	if (!show) return null;
	

    const field = 'healthCheckRating';
    const onChange = (
        _event: React.SyntheticEvent<HTMLElement, Event>,
        data: DropdownProps
    ) => {
        setFieldTouched(field, true);
        setFieldValue(field, data.value);
    };
    return (
        <Form.Field>
            <label>Health Check Rating</label>
            <Dropdown
                placeholder="Select Health Check Rating"
                fluid
                search
                selection
                options={options}
                onChange={onChange}
            />
            <ErrorMessage name={field} />
        </Form.Field>
    );
};

export default HealthCheckForm;
