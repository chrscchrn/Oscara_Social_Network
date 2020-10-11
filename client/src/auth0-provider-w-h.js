import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import React from "react";

const Auth0ProviderWithHistory = ({ children }) => {
    const history = useHistory();
    const domain = process.env.REACT_APP_AUTHO_DOMAIN;
    const clientId = process.env.REACT_APP_AUTHO_CLIENT_ID;

    const onRedirectCallback = (appState) => {
        history.push(appState?.returnTo || window.location.pathtime);
    };

    return (
        <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>, document.getElementById("root")
    );
}
export default Auth0ProviderWithHistory;