import React, { useState } from "react";
import axios from "axios";
import {
	Grid,
	Card,
	Form,
	Button,
	Icon,
	Segment,
	Header,
	Table,
} from "semantic-ui-react";

function BugsPage() {
	//TODO: END GAME add Checkboxs to columns that allow the user to turn on and off the displaying of those detections
	const getTableRows = () => {
		return (
			<div>
				{Array.from({ length: 12 }).map((_, index) => (
					<tr>
						<Table bordered hover>
							<td>
								<tr>Name: No Calle</tr>
								<tr>Severity: 10</tr>
								<tr>Type: Cross Site Scripting</tr>
							</td>
						</Table>
						<td>
							Description: Wow this is a description of the thing
							that is destroying your security. You should really
							consider fixing this problem as soon as possible.
						</td>
					</tr>
				))}
			</div>
		);
	};

	return (
		<Grid style={{ padding: "1.5vw" }}>
			<Grid.Row>
				<Segment style={{ width: "100%" }} fluid>
					<div>
						<Header as="h2" icon textAlign="center">
							<Icon name="bug" circular />
							<Header.Content>
								Security Issues Being Detected
							</Header.Content>
						</Header>
					</div>
				</Segment>
			</Grid.Row>
			<Grid.Row>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Info</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>{getTableRows()}</tbody>
				</Table>
			</Grid.Row>
		</Grid>
	);
}

export default BugsPage;
