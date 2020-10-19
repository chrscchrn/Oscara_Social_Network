import React from 'react'
import { AppBar, Typography, Toolbar } from '@material-ui/core';
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
        
    }
}));

export default function Top() {

    const { isAuthenticated, isLoading } = useAuth0();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar color="primary">
                <Toolbar className="top-container">
                    <img src="/images/osccircle.png" width="50" height="50"/>
                    <Typography variant="h4" className={classes.title}>
                        SCARA
                    </Typography>
                    {!isLoading && isAuthenticated ? <LogoutButton className={classes.logout} color="inherit"/> :
                    !isLoading && !isAuthenticated ? <LoginButton className={classes.login} color="inherit"/> : null}
                </Toolbar>
            </AppBar>
        </div>
    );
}
