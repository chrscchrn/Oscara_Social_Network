import React from 'react'
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
}));

export default function Top() {

    // useLocation()

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar color="primary">
                <Toolbar className="top-container">
                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>
                    <LoginButton color="inherit"/>
                    <LogoutButton color="inherit"/>
                </Toolbar>
            </AppBar>
        </div>
    );
}
