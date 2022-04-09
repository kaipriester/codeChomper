import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	Grid,
	Card,
	Modal,
	Form,
	List,
	Button,
	Image,
	Header,
	Input,
	Segment,
	Statistic,
	Dropdown,
	Icon,
	Tab,
} from "semantic-ui-react";
import moment from "moment";
import { getZipFile } from "../client/API.js";
import { ChartsPage } from "../components/ChartsPage";
import { useCookies } from "react-cookie";

function ViewMorePage(props) {
	const { id } = props;
	const [file, setFile] = useState({ Students: [] });
	const [cookies, setCookie] = useCookies(["user"]);
	const [open, setOpen] = useState(false);
	const [errors, setErrors] = useState([]);

	function getColor(value) {
		//value from 0 to 1
		value = value / 10;
		var hue = ((1 - value) * 120).toString(10);
		return ["hsl(", hue, ",100%,50%)"].join("");
	}

	useEffect(async () => {
		const results = (await getZipFile(cookies.password, id)).data;
		setFile(results);
	}, []);

	const panes = [
		{
			menuItem: "Students",
			render: () => (
				<Card.Group>
					{file.Students.map((student) => (
						<Card>
							<Card.Content>
								<Image
									floated="right"
									size="mini"
									src="https://i.ibb.co/vxd7Rwc/abc-123-programmer-software-developer-generated.jpg"
								/>
								<Card.Header>{student.Name}</Card.Header>
								<Card.Meta>
									Submitted {student.Files.length} files
								</Card.Meta>
								{/* <Card.Meta>Submitted 20 files</Card.Meta> */}
								{/* <Card.Meta>Submitted 20 files</Card.Meta> */}
								{/* <Card.Description textAlign="center">
            <Statistic label="detections" value={"4"} />
            <Statistic label="severity score" value={"9"} />
          </Card.Description> */}
							</Card.Content>
							<Card.Content extra>
								<Icon color={"blue"} name="user" />
								<span style={{ color: "blue" }}>
									{student.Files.reduce(
										(prev, currFile) =>
											prev + currFile.ErrorCount,
										0
									)}{" "}
									Detections
								</span>
							</Card.Content>
							<Card.Content extra>
								<Icon
									style={{
										color: getColor(student.SeverityScore),
									}}
									name="exclamation triangle"
								/>
								<span style={{ color: "black" }}>
									{student.SeverityScore} Severity Score
								</span>
							</Card.Content>
							<Card.Content extra>
								<div className="ui two buttons">
									{student.Files.reduce(
										(prev, currFile) =>
											prev + currFile.ErrorCount,
										0
									) !== 0 ? (
										<Button
											basic
											color="primary"
											onClick={() => {
												var allErrors = [];
												student.Files.forEach(
													(currFile) => {
														currFile.Errors.forEach(
															(error) => {
																allErrors.push({
																	data: error,
																	fileName:
																		currFile.Name,
																});
															}
														);
													}
												);
												setErrors(allErrors);
												setOpen(true);
											}}
										>
											view more
										</Button>
									) : (
										<></>
									)}
								</div>
							</Card.Content>
						</Card>
					))}
				</Card.Group>
			),
		},
		{ menuItem: "Graphs", render: () => <ChartsPage file={file} /> },
	];

	const getDate = (obj) => {
		obj = obj.substring(0, obj.indexOf("T"));
		return (
			obj.substring(obj.indexOf("-") + 1, obj.length) +
			"-" +
			obj.substring(0, obj.indexOf("-"))
		);
	};

	return (
		<Grid style={{ padding: "3.5vw" }}>
			<Grid.Row>
				<Header as="h1">
					{file.Name}
					<Header.Subheader>Ran on {file.Date}</Header.Subheader>
				</Header>
			</Grid.Row>
			<Grid.Row>
				<Card.Group>
					<Card>
						<Card.Content>
							<Card.Description textAlign="center">
								<Statistic
									label="number of files"
									value={file.FileCount}
								/>
							</Card.Description>
						</Card.Content>
					</Card>
					<Card>
						<Card.Content>
							<Card.Description textAlign="center">
								<Statistic
									label="number of detections"
									value={file.ErrorCount}
								/>
							</Card.Description>
						</Card.Content>
					</Card>
					<Card>
						<Card.Content>
							<Card.Description textAlign="center">
								<Statistic
									label="Severity Score"
									value={file.SeverityScore}
								/>
							</Card.Description>
						</Card.Content>
					</Card>
				</Card.Group>
			</Grid.Row>
			<Grid.Row>
				{/* alphabetical, date, number of files, detections, severity score, reverse alphabetical (jk)) */}
				<Grid.Column style={{ width: "80%" }}>
					<Input
						style={{ width: "100%" }}
						placeholder="Search for student"
					/>
				</Grid.Column>
				<Grid.Column>
					<Button icon="sort"></Button>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Tab menu={{ text: true, attached: false }} panes={panes} />
			</Grid.Row>
			<Grid.Row>
				<Modal
					onClose={() => setOpen(false)}
					onOpen={() => setOpen(true)}
					open={open}
				>
					<Modal.Header>Errors</Modal.Header>
					<Modal.Content>
						<Modal.Description>
							<List>
								{errors.map((err) => {
									return (
										// <div>{JSON.stringify(err)}</div>
										<Card.Group>
											<Card fluid>
												<Card.Content>
													<Card.Header>
														{err.data.ErrorType.Name.toLowerCase()
															.split(" ")
															.map(
																(s) =>
																	s
																		.charAt(
																			0
																		)
																		.toUpperCase() +
																	s.substring(
																		1
																	)
															)
															.join(" ")}{" "}
													</Card.Header>
													<Card.Meta>
														{err.fileName}
													</Card.Meta>
													<Card.Description>
														<span
															style={{
																fontWeight:
																	"bolder",
															}}
														>
															Description:
														</span>{" "}
														{
															err.data.ErrorType
																.Description
														}
													</Card.Description>
												</Card.Content>
												<Card.Content extra>
													<Icon name="file code" />
													line {err.data.Line}, column{" "}
													{err.data.Column}
												</Card.Content>
												<Card.Content extra>
													<Icon
														style={{
															color: getColor(
																err.data
																	.ErrorType
																	.Severity
															),
														}}
														name="warning sign"
													/>
													severity:{" "}
													{
														err.data.ErrorType
															.Severity
													}
												</Card.Content>
											</Card>
										</Card.Group>
									);
								})}
							</List>
						</Modal.Description>
					</Modal.Content>
					<Modal.Actions>
						<Button color="black" onClick={() => setOpen(false)}>
							Close
						</Button>
					</Modal.Actions>
				</Modal>
			</Grid.Row>
		</Grid>
	);
}

export default ViewMorePage;
