//https://community.auth0.com/t/react-with-auth0-spa-looses-login-after-refresh/35461
//React Specific
import React, { Component } from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
//Pages
import NoMatch from "./pages/NoMatch";
import SignupSteps from "./pages/SignupSteps";
import ProfilePage from "./pages/ProfilePage";
import Front from "./pages/Front";
// Auth0
import PrivateRoute from "./components/private";
//redux
import { Provider, provider } from 'react-redux';
import store from './redux/store';
//Components
import Profile from './components/Profile';
import "./App.css";
//Material UI
import { Container } from '@material-ui/core';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Container maxWidth="md" styles>
          <BrowserRouter>
                <Switch>
                  <Route exact path="/" component={Front} />
                  <PrivateRoute exact path="/profile" component={ProfilePage} />
                  <PrivateRoute path="/setup" />
                  <Route component={NoMatch} />
                </Switch>
          </BrowserRouter>
        </Container>
      </Provider>
    );
  }
}

export default App;
