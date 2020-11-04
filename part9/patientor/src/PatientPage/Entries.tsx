import React from 'react';
import { Entry, EntryType } from '../types';
import { assertNever } from '../utils';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthCareEntry from './OccupationalHealthCareEntry';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case EntryType.Hospital:
            return <HospitalEntry entry={entry} />;
        case EntryType.HealthCheck:
            return <HealthCheckEntry entry={entry} />;
        case EntryType.OccupationalHealthcare:
            return <OccupationalHealthCareEntry entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;
