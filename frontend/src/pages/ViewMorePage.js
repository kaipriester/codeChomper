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
import ChartsPage from "../components/ChartsPage";

function ViewMorePage(props) {
	const { id } = props;
	const [file, setFile] = useState({ Students: [] });
	const [open, setOpen] = useState(false);
	const [errors, setErrors] = useState([]);

	useEffect(async () => {
		const results = (await getZipFile(id)).data;
		console.log(results);
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
									color={"red"}
									name="exclamation triangle"
								/>
								<span style={{ color: "red" }}>
									2 Severity Score
								</span>
							</Card.Content>
							<Card.Content extra>
								<div className="ui two buttons">
									<Button
										basic
										color="primary"
										onClick={() => {
											var allErrors = [];
											console.log(student);
											student.Files.forEach(
												(currFile) => {
													currFile.Errors.forEach(
														(error) => {
															allErrors.push(
																error.Message
															);
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
								</div>
							</Card.Content>
						</Card>
					))}
				</Card.Group>
			),
		},
		{ menuItem: "Graphs", render: () => <ChartsPage/> },
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
					<Modal.Header>Erros</Modal.Header>
					<Modal.Content>
						<Modal.Description>
							<List>
								{errors.map((err) => (
									<List.Item>
										<List.Icon name="bug" />
										<List.Content>{err}</List.Content>
									</List.Item>
								))}
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

			{/* <Grid.Row>
        <Grid style={{ width: '100%', margin: '0' }}>
          <Grid.Row>
            {activeStatus && <Header>Processing Status</Header>}
          </Grid.Row>
          <Grid.Row>
            {activeStatus && (
            <Progress
              value={status}
              total="5"
              progress="percent"
              indicating
              style={{ width: '80%' }}
            />
            )}
          </Grid.Row>
        </Grid>
      </Grid.Row> */}
		</Grid>
	);
}

export default ViewMorePage;
