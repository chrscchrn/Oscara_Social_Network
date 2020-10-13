import React from "react";
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
    const domain = process.env.REACT_APP_AUTHO_DOMAIN;
    const clientId = process.env.REACT_APP_AUTHO_CLIENT_ID;
    const audience = process.env.REACT_APP_AUDIENCE;
    const history = useHistory();

    const onRedirectCallback = (appState) => {
        history.push(appState?.returnTo || window.location.pathtime);
    };

    return (
        <Auth0Provider
        domain="christophernc.us.auth0.com"
        clientId="I2MDjeZ30xiVLb5RmaJP10sWWuqG1NbC"
        redirectUri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
        audience="https://posts-api"
        >
            {children}
        </Auth0Provider>, document.getElementById("root")
    );
}
export default Auth0ProviderWithHistory;