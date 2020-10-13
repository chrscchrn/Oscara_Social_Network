import React from "react";
import ReactDOM from "react-dom";
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
// import { Auth0ProviderWithHistory } from "./auth0-provider-w-h";

// const domain = process.env.REACT_APP_AUTHO_DOMAIN;
// const clientId = process.env.REACT_APP_AUTHO_CLIENT_ID;

ReactDOM.render (
    <Auth0Provider
    domain="christophernc.us.auth0.com"
    clientId="I2MDjeZ30xiVLb5RmaJP10sWWuqG1NbC"
    redirectUri={window.location.origin}
    audience="https://christophernc.us.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata"
    >
        <App />
    </Auth0Provider>, document.getElementById("root")
);
registerServiceWorker();
