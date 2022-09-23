import React from "react";
import { Form, Grid, Input, Button, Message } from "semantic-ui-react";
import { Dropdown, Icon, Menu } from "semantic-ui-react";
import { useCookies } from "react-cookie";


function Landing(props) {
  const { updateRouteHandler } = props;
  const [cookies, setCookie, removeCookie] = useCookies(["loggedIn"]);

  return (
    <div>
      <h1>Welcome to codeChomper</h1>
      <Button onClick={() => updateRouteHandler("LogIn")}>login</Button>
			<Button onClick={() => updateRouteHandler("SignUp")}>Create an Account</Button>
    </div>
  );
}

export default Landing;