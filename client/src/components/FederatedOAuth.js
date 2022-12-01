import React, { useState, useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import jwt_decode from "jwt-decode";
import { facebookLogin, googleLogin } from "../client/API";
import { Form, Grid, Input, Button, Message, GridRow } from "semantic-ui-react";

function FederatedOAuth(props) {
  const [error, setError] = useState(false);
  const [errorMesage, setErrorMessage] = useState("There was an error authenticating");
  const { callUpdateUserObject } = props;
  const responseFacebook = async (response)=> {
    if (response.id) {
      try{
        await facebookLogin(response.id, response.name);
      }
      catch (err) {
        setError(true);
        setErrorMessage("There's already a user with your name: " + userObject.name);
      }
      callUpdateUserObject();
    }
    else {
      console.log(response);
      setErrorMessage("There was an error authenticating");
      setError(true);
    }
  };

  const responseGoogle = async (response) => {
    if (response.credential) {
      var userObject = jwt_decode(response.credential);
      try {
        await googleLogin(userObject.sub, userObject.name);
      }
      catch (err) {
				setError(true);
        setErrorMessage("There's already a user with your name: " + userObject.name);
      }
      callUpdateUserObject();
    }
    else {
      console.log(response);
      setErrorMessage("There was an error authenticating");
      setError(true);
    }
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "390826259140-6n1kgjgmacpeme764caiu15ovtkfua1j.apps.googleusercontent.com",
      callback: responseGoogle
    });

    google.accounts.id.renderButton(
      document.getElementById("googleDiv"),
      { theme: "outline", size: "large"}
    );
  });

  return (<div>
    <Grid style={{paddingTop: '3vh'}}>
			<Grid.Row>
        <FacebookLogin
            appId="1179351039598355"
            reauthenticate={true}
            fields="name"
            callback={responseFacebook}
            icon="fa-facebook"
            size="small"
          />
      </Grid.Row>
      <Grid.Row>
        <div id="googleDiv"></div>
			</Grid.Row>
      <Grid.Row>
        {error && (
					<Message negative>
						<p>{errorMesage}</p>
					</Message>
				)}
			</Grid.Row>
      </Grid>
    </div>
    );
};

export default FederatedOAuth;