import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Auth0Provider } from "@auth0/auth0-react";
// import { Auth0ProviderWithHistory } from "./auth0-provider-w-h";

// const domain = process.env.REACT_APP_AUTHO_DOMAIN;
// const clientId = process.env.REACT_APP_AUTHO_CLIENT_ID;

ReactDOM.render (
    <Auth0Provider
    domain="christophernc.us.auth0.com"
    clientId="I2MDjeZ30xiVLb5RmaJP10sWWuqG1NbC"
    redirectUri={window.location.origin}
    >
        <App />
    </Auth0Provider>, document.getElementById("root")
);
registerServiceWorker();
