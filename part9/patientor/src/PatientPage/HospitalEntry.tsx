import React from 'react';
import { Card, Item, Grid } from 'semantic-ui-react';
import { HospitalEntry as Entry } from '../types';
import BaseEntry from './BaseEntry';

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
        <Card fluid>
            <Card.Content>
                <BaseEntry entry={entry} type={'Hospital'} />
                <Item style={{ marginTop: '20px' }}>
                    <Item.Header as="h3" style={{ margin: '0px' }}>
                        Discharge Information
                    </Item.Header>
                    <Grid padded='vertically'>
                        <Grid.Row style={{ padding: '0px', marginTop: '5px' }}>
                            <Grid.Column width={3}>
                                <Item.Header as="h4" style={{ margin: '0px' }}>
                                    Date:
                                </Item.Header>
                            </Grid.Column>
                            <Grid.Column width={13}>
                                <Item.Header as="h4" style={{ margin: '0px' }}>
                                    Criteria:
                                </Item.Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '0px', marginTop: '5px' }}>
                            <Grid.Column width={3}>
                                {entry.discharge.date}
                            </Grid.Column>
                            <Grid.Column width={13}>
                                {entry.discharge.criteria}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Item>
            </Card.Content>
        </Card>
    );
};

export default HospitalEntry;
