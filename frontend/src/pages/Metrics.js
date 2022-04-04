import React, { useState } from "react";
import axios from "axios";
import { Grid, Icon, Segment, Header } from "semantic-ui-react";
import ChartsPage from "../components/ChartsPage";
import { Radar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

function MetricsPage() {
	return (
		<Grid style={{ padding: "1.5vw" }}>
			<Grid.Row>
				<Segment style={{ width: "100%" }} fluid>
					<div>
						<Header as="h2" icon textAlign="center">
							<Icon name="bar chart" circular />
							<Header.Content>Analyze Data</Header.Content>
						</Header>
					</div>
				</Segment>
			</Grid.Row>
			<Grid.Row>
				put new charts here
				{
					//<ChartsPage/>
				}
			</Grid.Row>
		</Grid>
	);
}

export default MetricsPage;
