import React from 'react';
import { Card, Item } from 'semantic-ui-react';
import { HealthCheckEntry as Entry } from '../types';
import BaseEntry from './BaseEntry';
import HealthRatingBar from '../components/HealthRatingBar';

const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
        <Card fluid>
            <Card.Content>
                <BaseEntry entry={entry} type={'Health Check'} />
                <Item style={{ marginTop: '20px' }}>
                    <Item.Header as="h3" style={{ margin: '0px', marginBottom:'5px' }}>
                        Health Check Information:
                    </Item.Header>
                    <Item.Description>
                        <strong>Health Check Rating: </strong>
                        <HealthRatingBar rating={entry.healthCheckRating} showText/>
                    </Item.Description>
                </Item>
            </Card.Content>
        </Card>
    );
};

export default HealthCheckEntry;
