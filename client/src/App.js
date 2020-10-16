//https://community.auth0.com/t/react-with-auth0-spa-looses-login-after-refresh/35461
//React Specific
import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//Pages
import NoMatch from "./pages/NoMatch";
import ProfilePage from "./pages/ProfilePage";
import Front from "./pages/Front";
//Components
import PrivateRoute from "./components/private";
import Top from './components/Top';
import "./App.css";
//Material UI
import { Container } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles/';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
//two new libs
//polish ui
//mvc folder structure
//protect api keys
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#e15160',
      main: '#aa1836',
      dark: '#740011',
      contrastText: '#fff',
    },
    secondary: {
      light: '#508b90',
      main: '#1f5e63',
      dark: '#003439',
      contrastText: '#fff',
    },
  },
})

class App extends Component {


  render() {

    return (
      <MuiThemeProvider theme={theme}>
          <Container maxWidth="lg">
          <Top/>
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Front} />
                <Route path="/profile" component={ProfilePage} />

                {/* <PrivateRoute exact path="/profile" component={ProfilePage} /> */}
                <Route component={NoMatch} />
              </Switch>
            </BrowserRouter>
          </Container>
      </MuiThemeProvider>
    );
  }
}
export default App;
