import React from "react";
import { Radar, Pie } from "react-chartjs-2";
import { MDBContainer, MDBCol, MDBRow, MDBBtn } from "mdbreact";
import { Grid, Card } from "semantic-ui-react";
import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
	ArcElement
  } from 'chart.js';

ChartJS.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
	ArcElement
);

export const severityData = {
	labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
	datasets: [
	  {
		label: '# of Votes',
		data: [12, 19, 3, 5, 2, 3],
		backgroundColor: [
		  'rgba(255, 99, 132, 0.2)',
		  'rgba(54, 162, 235, 0.2)',
		  'rgba(255, 206, 86, 0.2)',
		  'rgba(75, 192, 192, 0.2)',
		  'rgba(153, 102, 255, 0.2)',
		  'rgba(255, 159, 64, 0.2)',
		],
		borderColor: [
		  'rgba(255, 99, 132, 1)',
		  'rgba(54, 162, 235, 1)',
		  'rgba(255, 206, 86, 1)',
		  'rgba(75, 192, 192, 1)',
		  'rgba(153, 102, 255, 1)',
		  'rgba(255, 159, 64, 1)',
		],
		borderWidth: 1,
	  },
	],
};

export const typesData = {
	labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
	datasets: [
	  {
		label: '# of Votes',
		data: [12, 19, 3, 5, 2, 3],
		backgroundColor: [
		  'rgba(255, 99, 132, 0.2)',
		  'rgba(54, 162, 235, 0.2)',
		  'rgba(255, 206, 86, 0.2)',
		  'rgba(75, 192, 192, 0.2)',
		  'rgba(153, 102, 255, 0.2)',
		  'rgba(255, 159, 64, 0.2)',
		],
		borderColor: [
		  'rgba(255, 99, 132, 1)',
		  'rgba(54, 162, 235, 1)',
		  'rgba(255, 206, 86, 1)',
		  'rgba(75, 192, 192, 1)',
		  'rgba(153, 102, 255, 1)',
		  'rgba(255, 159, 64, 1)',
		],
		borderWidth: 1,
	  },
	],
};

class ChartsPage extends React.Component {
	state = {
		dataRadar: {
			labels: [
				"Eating",
				"Drinking",
				"Sleeping",
				"Designing",
				"Coding",
				"Cycling",
				"Running",
			],
			datasets: [
				{
					label: "My First dataset",
					backgroundColor: "rgba(194, 116, 161, 0.5)",
					borderColor: "rgb(194, 116, 161)",
					data: [65, 59, 90, 81, 56, 55, 40],
				},
				{
					label: "My Second dataset",
					backgroundColor: "rgba(71, 225, 167, 0.5)",
					borderColor: "rgb(71, 225, 167)",
					data: [28, 48, 40, 19, 96, 27, 100],
				},
			],
		},
	};

	render() {
		return (
			<Card.Group>
				<Card>
					<Card.Content>
						<Card.Header>Radar Chart</Card.Header>
						<Radar
							data={this.state.dataRadar}
							options={{ responsive: true }}
						/>
					</Card.Content>
				</Card>
				<Card>
					<Card.Header>Students with Most Vulnerabilities</Card.Header>
					<Card.Content>
						<ol>
							<li>wilcoxgrace</li>
						</ol>
					</Card.Content>
				</Card>
				<Card>
					<Card.Header>Severity of Vulnerabilities</Card.Header>
					<Card.Content>
						<Pie data={severityData} />
					</Card.Content>
				</Card>
				<Card>
					<Card.Header>Types of Vulnerabilities</Card.Header>
					<Card.Content>
						<Pie data={typesData} />
					</Card.Content>
				</Card>
			</Card.Group>
		);
	}
}

export default ChartsPage;
