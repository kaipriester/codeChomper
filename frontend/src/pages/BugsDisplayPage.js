import React, { useState, useEffect } from "react";
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

import { getErrorTypes, getErrorTypesNum } from "../client/API.js";

function BugsPage() {
	const [nameArray, setNameArray] = useState([]);
	const [severityArray, setSeverityArray] = useState([]);
	const [descriptionArray, setDescriptionArray] = useState([]);

	function ArrayAdder(name, severity, description) {
		// Delete this later
		setNameArray((nameArray) => [...nameArray, name]);
		setSeverityArray((severityArray) => [...severityArray, severity]);
		setDescriptionArray((descriptionArray) => [
			...descriptionArray,
			description,
		]);
	}

	useEffect(async () => {
		var counter = await getErrorTypesNum();
		console.log(counter.data);
		for (let i = 0; i < counter.data; i++) {
			const results = (await getErrorTypes(i)).data;
			ArrayAdder(results.Name, results.Severity, results.Description);
		}
		console.log(results);
	}, []);

	//TODO: END GAME add Checkboxs to columns that allow the user to turn on and off the displaying of those detections
	const getTableRows = () => {
		return (
			<div>
				{Array.from({ length: 24 }).map((_, index) => (
					<tr>
						<Table bordered hover>
							<td>
								<tr>Name: {nameArray[index]} </tr>
								<tr>Severity: {severityArray[index]} </tr>
								<tr>Type: </tr>
							</td>
						</Table>
						<td>Description: {descriptionArray[index]}</td>
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
