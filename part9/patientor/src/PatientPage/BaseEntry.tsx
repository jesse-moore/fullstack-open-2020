import React from 'react';
import { useStateValue } from '../state';
import { Entry } from '../types';
import { Card, Item, Grid } from 'semantic-ui-react';

const BaseEntry: React.FC<{ entry: Entry; type: string }> = ({
    entry,
    type,
}) => {
    const [{ diagnosis }] = useStateValue();
    const { date, description, diagnosisCodes, specialist } = entry;
    return (
        <>
            <Card.Header>{date}</Card.Header>
            <Card.Meta>Seen By: {specialist}</Card.Meta>
            <Item style={{ marginTop: '20px' }}>
                <Item.Header as="h3" style={{ marginBottom: '5px' }}>
                    Visit type: {type}
                </Item.Header>
                <Item.Header as="h4" style={{ margin: '0px' }}>
                    Description:
                </Item.Header>
                <Item.Description>
                    {description ? description : null}
                </Item.Description>
            </Item>
            {diagnosisCodes ? (
                <Item style={{ marginTop: '20px' }}>
                    <Item.Header as="h3" style={{ margin: '0px' }}>
                        Diagnosis Codes
                    </Item.Header>
                    <Grid padded="vertically">
                        <Grid.Row style={{ padding: '0px', marginTop: '5px' }}>
                            <Grid.Column width={2}>
                                <Item.Header as="h4" style={{ margin: '0px' }}>
                                    Code:
                                </Item.Header>
                            </Grid.Column>
                            <Grid.Column width={14}>
                                <Item.Header as="h4" style={{ margin: '0px' }}>
                                    Name:
                                </Item.Header>
                            </Grid.Column>
                        </Grid.Row>
                        {diagnosisCodes?.map((code) => {
                            return (
                                <Grid.Row
                                    key={code}
                                    style={{ padding: '0px', marginTop: '5px' }}
                                >
                                    <Grid.Column width={2}>{code}</Grid.Column>
                                    <Grid.Column width={14}>
                                        {diagnosis[code].name}
                                    </Grid.Column>
                                </Grid.Row>
                            );
                        })}
                    </Grid>
                </Item>
            ) : null}
        </>
    );
};

export default BaseEntry;
