import React from 'react';
import { Card, Item, Grid } from 'semantic-ui-react';
import { OccupationalHealthcareEntry as Entry } from '../types';
import BaseEntry from './BaseEntry';

const OccupationalHealthCareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
        <Card fluid>
            <Card.Content>
                <BaseEntry entry={entry} type={'Hospital'} />
                <Item style={{ marginTop: '20px' }}>
                    <Item.Header
                        as="h3"
                        style={{ margin: '0px', marginBottom: '5px' }}
                    >
                        Occupational Health Information:
                    </Item.Header>
                    <Item.Description>
                        <strong>Employer: </strong>
                        {entry.employerName}
                    </Item.Description>
                </Item>
                {entry.sickLeave ? (
                    <Item style={{ marginTop: '20px' }}>
                        <Item.Header as="h3" style={{ margin: '0px' }}>
                            Sick Leave
                        </Item.Header>
                        <Grid padded="vertically">
                            <Grid.Row
                                style={{ padding: '0px', marginTop: '5px' }}
                            >
                                <Grid.Column width={3}>
                                    <Item.Header
                                        as="h4"
                                        style={{ margin: '0px' }}
                                    >
                                        Start Date:
                                    </Item.Header>
                                </Grid.Column>
                                <Grid.Column width={13}>
                                    <Item.Header
                                        as="h4"
                                        style={{ margin: '0px' }}
                                    >
                                        End Date:
                                    </Item.Header>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row
                                style={{ padding: '0px', marginTop: '5px' }}
                            >
                                <Grid.Column width={3}>
                                    {entry.sickLeave.startDate}
                                </Grid.Column>
                                <Grid.Column width={13}>
                                    {entry.sickLeave.endDate}
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Item>
                ) : null}
            </Card.Content>
        </Card>
    );
};

export default OccupationalHealthCareEntry;
