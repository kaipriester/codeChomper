import React, { useState } from "react";
import axios from "axios";
import { Grid, Card, Form, Button, Icon, Segment, Header, Table } from "semantic-ui-react";

function BugsPage() {
    //TODO: END GAME add Checkboxs to columns that allow the user to turn on and off the displaying of those detections
    return (
        <Grid style={{ padding: "1.5vw" }}>
            <Grid.Row>
                <Segment style={{ width: "100%" }} fluid>
                    <div>
                        <Header as="h2" icon textAlign="center">
                            <Icon name="bug" circular />
                            <Header.Content>Security Issues Being Detected</Header.Content>
                        </Header>
                    </div>
                </Segment>
            </Grid.Row>
            <Grid.Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Detection Name</th>
                            <th>Description</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan={2}>Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </Grid.Row>
        </Grid>
    );
}

export default BugsPage;
