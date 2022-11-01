import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";

function FederatedOAuth() {

  const responseFacebook = (response)=> {
    console.log(response);
  };

  const componentClicked = () => console.log("clicked");

  return (<div>
      <FacebookLogin
          appId={process.env.FACEBOOK_APP_ID}
          autoLoad={true}
          fields="name,email"
          onClick={componentClicked}
          callback={responseFacebook}
          icon="fa-facebook"
          size="small"
        />
    </div>
    );
};

export default FederatedOAuth;