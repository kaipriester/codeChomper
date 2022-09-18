import React, { useState } from "react";
import { Form, Grid, Input, Button, Message } from "semantic-ui-react";
import { login } from "../client/API.js";
import { useCookies } from "react-cookie";

function LogIn(props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [cookies, setCookie] = useCookies(["loggedIn"]);
	const { updateRouteHandler } = props;
	const [wrong, setWrong] = useState(false);

	const submitCredentials = async () => {
		setWrong(false);
		const result = await login(username, password);
		if (result.data) {
			setCookie("loggedIn", true, { path: "/" });
			updateRouteHandler("main");
		} else {
			setWrong(true);
		}
	};
	const signInPage = async () => {
		updateRouteHandler("SignIn");
	}

	return (
		<Grid style={{paddingTop: '3vh'}}>
			<Grid.Row>
				<h1>Log In</h1>
			</Grid.Row>
			<Grid.Row>
				<Form>
					<Input
						type="text"
						label="username"
						onChange={(e) => setUsername(e.target.value)}
						onKeyDown={(e) => {if (e.keyCode === 13) {submitCredentials();}}}
					></Input>
				</Form>
			</Grid.Row>
			<Grid.Row>
				<Form>
					<Input
						type="password"
						label="password"
						onChange={(e) => setPassword(e.target.value)}
						onKeyDown={(e) => {if (e.keyCode === 13) {submitCredentials();}}}
					></Input>
				</Form>
			</Grid.Row>
			<Grid.Row>
				<Button onClick={() => submitCredentials()}>login</Button>
			</Grid.Row>
			<Grid.Row>
				{wrong && (
					<Message negative>
						<p>Invalid credentials.</p>
					</Message>
				)}
			</Grid.Row>
			<Grid.Row>
				<h2>New Here?</h2>
			</Grid.Row>
			<Grid.Row>
				<Button onClick={() => signInPage()}>Creat an Account</Button>
			</Grid.Row>
		</Grid>
	);
}

export default LogIn;