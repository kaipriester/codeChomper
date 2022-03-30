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

import { JoshuaTest, getZipFile, ErrorTypes, getErrorTypes } from "../client/API.js";

function BugsPage() {



		const [bugInformation, setBugInformation] = useState("");

	


		useEffect(async () => {
			const results = (await getErrorTypes(0)).data; //need to iterate through this 
			console.log(results);
			setBugInformation(results);
			console.log(file);
		}, []);



	//TODO: END GAME add Checkboxs to columns that allow the user to turn on and off the displaying of those detections
	const getTableRows = () => {
		return (
		
			<div>
				{Array.from({ length: 24 }).map((_, index) => (
					<tr>
						<Table bordered hover>
							<td>
								<tr>Name: {bugInformation.Name} </tr>
								<tr>Severity: {bugInformation.Severity} </tr>
								<tr>Type: </tr>
							</td>
						</Table>
						<td>
							Description: {bugInformation.Description}
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
