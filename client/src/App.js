//https://community.auth0.com/t/react-with-auth0-spa-looses-login-after-refresh/35461
//React Specific
import React, { Component, Suspense } from "react";
import Loading from "./components/Loading";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//Pages
import NoMatch from "./pages/NoMatch";
//Components
import PrivateRoute from "./components/private";
import Top from './components/Top';
import "./App.css";
//Material UI
import { Container } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles/';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const Front = React.lazy(() => import("./pages/Front"));
const UsersPage = React.lazy(() => import("./pages/UsersPage"));

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
              <Suspense fallback={<Loading/>}>
                <Switch>
                  <Route exact path="/" component={Front}/>
                  <PrivateRoute exact path="/profile" component={ProfilePage}/>
                  <PrivateRoute path="/user/" component={UsersPage}/>
                  <Route component={NoMatch} />
                </Switch>
              </Suspense>
            </BrowserRouter>
          </Container>
      </MuiThemeProvider>
    );
  }
}
export default App;
