import React from 'react';
import { Entry } from '../types';
import { assertNever } from '../utils';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthCareEntry from './OccupationalHealthCareEntry';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case 'Hospital':
            return <HospitalEntry entry={entry} />;
        case 'HealthCheck':
            return <HealthCheckEntry entry={entry}/>;
        case 'OccupationalHealthcare':
            return <OccupationalHealthCareEntry entry={entry}/>;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;
