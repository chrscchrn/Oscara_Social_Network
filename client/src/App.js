//https://community.auth0.com/t/react-with-auth0-spa-looses-login-after-refresh/35461
//React Specific
import React, { Component } from "react";
import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom";
//componentdidmount && useLocation hook react-router-dom
//Pages
import NoMatch from "./pages/NoMatch";
import ProfilePage from "./pages/ProfilePage";
import Front from "./pages/Front";
//redux
import { Provider, provider } from 'react-redux';
import store from './redux/store';
//Components
import PrivateRoute from "./components/private";
import Top from './components/Top';
import "./App.css";
//Material UI
import { Container } from '@material-ui/core';
import { MuiThemeProvider as MuiThemeProvider } from '@material-ui/core/styles/';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

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
          <Top/>
          <Container maxWidth="lg">
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Front} />
                <PrivateRoute exact path="/profile" component={ProfilePage} />
                {/* <PrivateRoute path="/setup" component={SignupSteps}/> */}
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
