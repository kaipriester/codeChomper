import React, { useState } from "react";
import { Form, Grid, Input, Button, Message } from "semantic-ui-react";
import { login } from "../client/API.js";
import { useCookies } from "react-cookie";

function LogIn(props) {
	const [password, setPassword] = useState("");
	const [cookies, setCookie] = useCookies(["user"]);
	const { updateRouteHandler } = props;
	const [wrong, setWrong] = useState(false);

	const submitPassword = async () => {
		setWrong(false);
		const result = await login(password);
		setCookie("password", password, { path: "/" });
		if (result.data) {
			updateRouteHandler("main");
		} else {
			setWrong(true);
		}
	};

	return (
		<Grid style={{ padding: "1.5vw" }}>
			<Grid.Row>
				<Form>
					<Input
						type="password"
						label="password"
						onChange={(e) => setPassword(e.target.value)}
					></Input>
				</Form>
			</Grid.Row>
			<Grid.Row>
				<Button onClick={() => submitPassword()}>login</Button>
			</Grid.Row>
			<Grid.Row>
				{wrong && (
					<Message negative>
						<p>Incorrect Password! Try Again!</p>
					</Message>
				)}
			</Grid.Row>
		</Grid>
	);
}

export default LogIn;
