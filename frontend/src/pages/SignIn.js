import React, { useState } from "react";
import { Form, Grid, Input, Button, Message } from "semantic-ui-react";
import { signin } from "../client/API.js";
import { useCookies } from "react-cookie";
import { List } from "semantic-ui-react";

function SignIn(props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
	const [cookies, setCookie] = useCookies(["loggedIn"]);
	const { updateRouteHandler } = props;
	const [wrong, setWrong] = useState([]);

	const createAccount = async () => {
		setWrong([]);
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    var passwordRegex = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!usernameRegex.test(username)) {
      setWrong(prevState => ([...prevState, <li>"Username is invalid"</li>]));
    }
    if (!passwordRegex.test(password)) {
      setWrong(prevState => ([...prevState, <li>"Password is not strong enough. Must contain at least one number and 6-16 characters"</li>]));
    }
    if (password != rePassword) {
      setWrong(prevState => ([...prevState, <li>"Passwords don't match"</li>]));
    }

    if (wrong.length > 0) 
      return;

		const result = await signin(username, password);
		if (result.data) {
			setCookie("loggedIn", true, { path: "/" });
			updateRouteHandler("main");
		} else {
			setWrong(true);
		}
	};

	return (
		<Grid style={{paddingTop: '3vh'}}>
      <Grid.Row>
				<h1>Create an Account</h1>
			</Grid.Row>
			<Grid.Row>
				<Form>
					<Input
						type="text"
						label="username"
						onChange={(e) => setUsername(e.target.value)}
						onKeyDown={(e) => {if (e.keyCode === 13) {createAccount();}}}
					></Input>
				</Form>
			</Grid.Row>
			<Grid.Row>
				<Form>
					<Input
						type="password"
						label="password"
						onChange={(e) => setPassword(e.target.value)}
						onKeyDown={(e) => {if (e.keyCode === 13) {createAccount();}}}
					></Input>
				</Form>
			</Grid.Row>
      <Grid.Row>
				<Form>
					<Input
						type="password"
						label="Confirm password"
						onChange={(e) => setRePassword(e.target.value)}
						onKeyDown={(e) => {if (e.keyCode === 13) {createAccount();}}}
					></Input>
				</Form>
			</Grid.Row>
			<Grid.Row>
				<Button onClick={() => createAccount()}>Sign In</Button>
			</Grid.Row>
			<Grid.Row>
				{wrong.length > 0 && (
					<Message negative>
						<ul>{wrong}</ul>
					</Message>
				)}
			</Grid.Row>
		</Grid>
	);
}

export default SignIn;