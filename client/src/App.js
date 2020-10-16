//https://community.auth0.com/t/react-with-auth0-spa-looses-login-after-refresh/35461
//React Specific
import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//Pages
import NoMatch from "./pages/NoMatch";
import ProfilePage from "./pages/ProfilePage";
import Front from "./pages/Front";
//redux
import { Provider } from 'react-redux';
import store from './redux/store';
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
      light: '#535da8',
      main: '#283593',
      dark: '#1c2566',
      contrastText: '#fff',
    },
    secondary: {
      light: '#637bfe',
      main: '#3d5afe',
      dark: '#2a3eb1',
      contrastText: '#fff',
    },
  },
})

class App extends Component {


  render() {

    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Container maxWidth="lg">
          <Top/>
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Front} />
                <PrivateRoute exact path="/profile" component={ProfilePage} />
                <Route component={NoMatch} />
              </Switch>
            </BrowserRouter>
          </Container>
        </Provider>
      </MuiThemeProvider>
    );
  }
}
export default App;
