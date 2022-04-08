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

export const pieColors =  [
	'rgba(99, 255, 195, 0.4)',
	'rgba(99, 255, 133, 0.4)',
	'rgba(131, 255, 99, 0.4)',
	'rgba(131, 255, 99, 0.4)',
	'rgba(215, 255, 99, 0.4)',
	'rgba(247, 255, 99, 0.4)',
	'rgba(255, 214, 99, 0.4)',
	'rgba(255, 185, 99, 0.4)',
	'rgba(255, 149, 99, 0.4)',
	'rgba(255, 99, 99, 0.4)'
];

function getErrors(students) {
	var errorList = [];
	students.map((student) => student.Files.map((file) => file.Errors.map((error) => errorList.push(error))));
	return errorList;
}


function ChartsPage(props) {
	// put radar chart in here somewhere

	// get list of errors from all students in zip
	const errorList = getErrors(props.file.Students);
	
	// get frequency of vulnerabilities
	var freqOfVuln = new Array(10).fill(0);
	errorList.forEach((error) => freqOfVuln[error.ErrorType.Severity]++);
	console.log(freqOfVuln);

	const data = {
		labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		datasets: [
			{
				label: "# of Votes",
				data: freqOfVuln,
				backgroundColor: pieColors,
				borderColor: pieColors,
				borderWidth: 1,
			},
		],
	};
	

	return (
		<Card.Group>
			<Card>
				<Card.Header>Zip File Severity</Card.Header>
				<Card.Content>
					<GaugeChart id="gauge-chart1"
					nrOfLevels={9}
					percent={props.file.SeverityScore / 10}
					textColor='#345243'
					needleColor='#8A948F'
					formatTextValue={value => value / 10} />
				</Card.Content>
			</Card>
			<Card>
				<Card.Header>Students with Highest Severity Score</Card.Header>
				<Card.Content>
					<List>
						{props.file.Students
						.sort((a, b) => b.SeverityScore - a.SeverityScore)
						.slice(0, 5)
						.map((student) => <List.Item>{student.Name}: {student.SeverityScore.toString()}</List.Item>)}
					</List>
				</Card.Content>
			</Card>
			<Card>
				<Card.Header>Severity of Vulnerabilities</Card.Header>
				<Card.Content>
					<Pie data={data} />
				</Card.Content>
			</Card>
			<Card>
				<Card.Header>Most Popular Vulnerabilities</Card.Header>
				<Card.Content>
					<List>
						<List.Item>create list of vulnerabilites + their frequency</List.Item>
					</List>
				</Card.Content>
			</Card>
		</Card.Group>
	);
}

export default ChartsPage;
