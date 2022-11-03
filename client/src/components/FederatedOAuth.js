import React, { Component, useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import jwt_decode from "jwt-decode";
import { facebookLogin, googleLogin } from "../client/API";
import { Form, Grid, Input, Button, Message, GridRow } from "semantic-ui-react";

function FederatedOAuth(props) {

  const { callUpdateUserObject } = props;
  const responseFacebook = async (response)=> {
    if (response.id) {
      var res = await facebookLogin(response.id, response.name);
      console.log(res);
      callUpdateUserObject();
    }
    else {
      //deal with error
    }
  };

  const responseGoogle = async (response) => {
    if (response.credential) {
      var userObject = jwt_decode(response.credential);
      var res = await googleLogin(userObject.sub, userObject.name);
        console.log(res);
      callUpdateUserObject();
    }
    else {
      //deal with error
    }
  };

  const componentClicked = () => console.log("clicked");

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
            fields="name,email"
            onClick={componentClicked}
            callback={responseFacebook}
            icon="fa-facebook"
            size="small"
          />
      </Grid.Row>
      <Grid.Row>
        <div id="googleDiv"></div>
			</Grid.Row>
      </Grid>
    </div>
    );
};

export default FederatedOAuth;