import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      alignSelf: "center"
    },
}));

function Loading() {

    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <CircularProgress />
            </div>
        </>
    );
};

export default Loading;