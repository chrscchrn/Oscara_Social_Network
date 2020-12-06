import React from 'react'
import { useHistory } from "react-router-dom";
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    login: {
        
    },
    arrow: {
        color: "white",
    }
}));

export default function Top() {

    const { isAuthenticated, isLoading } = useAuth0();
    const classes = useStyles();
    let history = useHistory();

    const handleBack = () => {
        window.redirect("/");
    }

    return (
        <div className={classes.root}>
            <AppBar color="primary">
                <Toolbar className="top-container">
                    {/* {window.location.pathname.slice(0, 5) === '/user' ? 
                    <Button onClick={() => history.goBack()}>
                        <ArrowBackIcon size="large" className={classes.arrow}/>
                    </Button> : null} */}
                    <Typography variant="h4" className={classes.title}>
                        OSCARA
                    </Typography>
                    {!isLoading && isAuthenticated ? <LogoutButton className={classes.logout} color="inherit"/> :
                    !isLoading && !isAuthenticated ? <LoginButton className={classes.login} color="inherit"/> : null}
                </Toolbar>
            </AppBar>
        </div>
    );
}
