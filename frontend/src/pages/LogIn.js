import React, { useState } from "react";
import { Form, Grid, Input, Button } from "semantic-ui-react";
import { login } from "../client/API.js";
import { useCookies } from "react-cookie";

function LogIn(props) {
	const [password, setPassword] = useState("");
	const [cookies, setCookie] = useCookies(["user"]);
	const { updateRouteHandler } = props;

	const submitPassword = async () => {
		const result = await login(password);
		setCookie("password", password, { path: "/" });
		updateRouteHandler("main");
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
		</Grid>
	);
}

export default LogIn;
