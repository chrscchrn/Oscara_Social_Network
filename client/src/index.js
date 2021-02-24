import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Auth0Provider } from "@auth0/auth0-react";
import { getConfig } from "./config";

const config = getConfig();

const providerConfig = {
    domain: process.env.DOMAIN || config.domain,
    clientId: process.env.CLIENTID || config.clientId,
    ...(process.env.AUDIENCE ? { audience: process.env.AUDIENCE } : { audience: config.audience }),
    redirectUri: window.location.origin,
};

ReactDOM.render (
    <Auth0Provider {...providerConfig}>
        <App />
    </Auth0Provider>, document.getElementById("root")
);

registerServiceWorker();