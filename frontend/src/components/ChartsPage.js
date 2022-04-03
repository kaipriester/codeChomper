import React from "react";
import { Radar, Pie } from "react-chartjs-2";
import GaugeChart from 'react-gauge-chart'
import { Card, List } from "semantic-ui-react";
import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
	ArcElement,
} from "chart.js";

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
			label: "# of Votes",
			data: [12, 19, 3, 5, 2, 3],
			backgroundColor: [
				"rgba(255, 99, 132, 0.2)",
				"rgba(54, 162, 235, 0.2)",
				"rgba(255, 206, 86, 0.2)",
				"rgba(75, 192, 192, 0.2)",
				"rgba(153, 102, 255, 0.2)",
				"rgba(255, 159, 64, 0.2)",
			],
			borderColor: [
				"rgba(255, 99, 132, 1)",
				"rgba(54, 162, 235, 1)",
				"rgba(255, 206, 86, 1)",
				"rgba(75, 192, 192, 1)",
				"rgba(153, 102, 255, 1)",
				"rgba(255, 159, 64, 1)",
			],
			borderWidth: 1,
		},
	],
};

class ChartsPage extends React.Component {

	render() {
		return (
			<Card.Group>
				<Card>
					<Card.Header>Gauge Chart</Card.Header>
					<Card.Content>
						<GaugeChart id="gauge-chart1" />
					</Card.Content>
				</Card>
				<Card>
					<Card.Header>Students with Most Vulnerabilities</Card.Header>
					<Card.Content>
						<List ordered>
							<List.Item>wilcoxgrace</List.Item>
						</List>
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
