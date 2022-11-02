import React, { Component, useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import jwt_decode from "jwt-decode";

function FederatedOAuth() {

  const responseFacebook = (response)=> {
    console.log(response);
  };

  const responseGoogle = (response) => {
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
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
      <FacebookLogin
          appId="1179351039598355"
          reauthenticate={true}
          fields="name,email"
          onClick={componentClicked}
          callback={responseFacebook}
          icon="fa-facebook"
          size="small"
        />
      <div id="googleDiv"></div>
    </div>
    );
};

export default FederatedOAuth;