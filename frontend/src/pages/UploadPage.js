import React, { useState } from "react";
import axios from "axios";
import {
	Grid,
	Card,
	Form,
	Button,
	Segment,
	Icon,
	Header,
	Message,
} from "semantic-ui-react";
import { useCookies } from "react-cookie";

function UploadPage() {
	const [processedFiles, setProcessedFiles] = useState([]);
	const [file, setFile] = useState();
	const [fileName, setFileName] = useState("");
	const [cookies, setCookie] = useCookies(["user"]);
	const [success, setSuccess] = useState(false);

	const saveFile = (e) => {
		setFile(e.target.files[0]);
		setFileName(e.target.files[0].name);
	};

	const uploadFile = async (e) => {
		setSuccess(false);
		const formData = new FormData();
		formData.append("file", file);
		formData.append("fileName", fileName);

		try {
			const res = await axios.post(
				`http://localhost:8080/upload?password=${cookies.password}`,
				formData
			);
			setProcessedFiles(res.data);
			console.log(res);
		} catch (ex) {
			console.log(ex);
		}
		setSuccess(true);
	};

	return (
		<Grid style={{ paddingLeft: "2.5vw", paddingTop: "2.5vh" }}>
			<Grid.Row>
				<Segment style={{ width: "100%" }} fluid>
					<div>
						<Header as="h2" icon textAlign="center">
							<Icon name="upload" circular />
							<Header.Content>Upload Student Code</Header.Content>
						</Header>
					</div>
				</Segment>
			</Grid.Row>
			<Grid.Row>
				<Form>
					<Form.Field>
						<label>Code</label>
						<input type="file" onChange={saveFile} />
					</Form.Field>
					<Button type="submit" onClick={uploadFile}>
						Submit
					</Button>
				</Form>
			</Grid.Row>
			<Grid.Row>
				{success && (
					<Message positive>
						<p>Upload Successful!</p>
					</Message>
				)}
			</Grid.Row>
		</Grid>
	);
}

export default UploadPage;
