import React, { Dispatch, SetStateAction } from 'react';
import { Dropdown, DropdownProps, Form } from 'semantic-ui-react';
import { EntryType } from '../types';

// structure of a single option
type EntryOption = {
    value: EntryType;
    text: string;
};

const options: EntryOption[] = [
    { value: EntryType.HealthCheck, text: 'Health Check' },
    { value: EntryType.Hospital, text: 'Hospital' },
    {
        value: EntryType.OccupationalHealthcare,
        text: 'Occupational Healthcare',
    },
];

interface Props {
    setType: Dispatch<SetStateAction<EntryType>>;
    type: EntryType;
}

const TypeSelect: React.FC<Props> = ({ setType, type }) => {
    const onChange = (
        _event: React.SyntheticEvent<HTMLElement, Event>,
        data: DropdownProps
    ) => {
        const validOption = options.find(
            (option) => option.value === data.value
        );
        if (validOption === undefined) return;
 
        const type = validOption.value;
        setType(type);
    };

    return (
        <Form.Field>
            <label>Entry Type</label>
            <Dropdown
                fluid
                placeholder="Select Entry Type"
                selection
                value={type}
                options={options}
                onChange={onChange}
            />
        </Form.Field>
    );
};

export default TypeSelect;
