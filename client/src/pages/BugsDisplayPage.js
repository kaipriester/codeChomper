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

//TO-DO redesign this

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
	const getTableRowsJavaScript = () => {
		return (
			<div>
				{Array.from({ length: 24 }).map((_, index) => (
					<tr>
						<Table bordered hover>
							<td>
								<tr><b>  {nameArray[index]} </b></tr>
								<tr>Severity Level: {severityArray[index]} </tr>
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


				<Table>

			
   
    <thead>
		
        <tr>
            <th  style={{ width: "33%" }}>Severity Score (Zip Folders/Students) </th>
            <th style={{ width: "67%" }}> Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
			<td>No Security Concerns                                                                                   </td>
        </tr>
        <tr>
            <td>3</td>
            <td>A Few Minor Security Concerns                                                                          </td>
        </tr>
		<tr>
            <td>5</td>
            <td>A Few Security Conerns/Many Minor Security Concerns                                                     </td>
        </tr>
		<tr>
            <td>8</td>
            <td>A Major Security Concern/Many Security Concerns                                                         </td>
        </tr>
		<tr>
            <td>10</td>
            <td>Many Major Security Concerns</td>
        </tr>
    </tbody>
	<br></br>
				</Table>


				<Table>

			
   
    <thead>
        <tr>
            <th style={{ width: "33%" }}>Severity Level (Security Flaw/Detections) </th>
            <th style={{ width: "67%" }}> Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>0</td>
			<td>Score Given to Any Unidentified Issues by ESLint (Most likely not a security concern) </td>
        </tr>
        <tr>
            <td>1</td>
            <td> Not a Security Concern </td>
        </tr>
		<tr>
            <td>2</td>
            <td>Minor Security Concern (Can lead to potential attacks, but will generally not result in a data breach) </td>
        </tr>
		<tr>
            <td>5</td>
            <td>Mid-Level Security Concern/Many Security Concerns (Can lead to a potential data breach/assault on the server)</td>
        </tr>
		<tr>
            <td>10</td>
            <td>Major Security Concerns (Can lead to complete access to the entire server/allow for foreign code to be executed) </td>
        </tr>
		
    </tbody>
	
	<br></br>
				</Table>
			</Grid.Row>
			<Table striped bordered hover>
					<thead>
						<tr>
							<th>JavaScript Security Issue Types</th>
						</tr>
					</thead>
					<tbody>{getTableRowsJavaScript()}</tbody>
	
					<br></br>

				</Table>

				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Python Security Issue Types</th>
						</tr>
					</thead>
					<tbody>{}</tbody>
	
					<br></br>

				</Table>
		</Grid>
	);
}

export default BugsPage;