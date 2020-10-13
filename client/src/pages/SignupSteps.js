import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from "@material-ui/core/Card";
import Axios from "axios";

//step 1: add user handle
//step 2: add profile image
//step 3: add bio
//step 4: add city
//complete: add user to the database
// post('/api/adduser') to add user to the database LAST

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        top: "100px"
    },
    form: {
      '& > *': {
        margin: theme.spacing(1),
        width: '50ch',
      },
    },
    typography: {
        padding: 20,
        float: "left"
    },
    card: {
        width: "100%",
        textAlign: "center",
        padding: 20
    },
    button: {
        margin: 5,
        float: "right",
        height: 60
    }
}));

export default function SignupSteps() {

    const { user, isAuthenticated, isLoading } = useAuth0();
    const classes = useStyles();

    const [setupState, setSetupState] = useState({ 
        step: 1,
        handle: "",
        bio: "",
        location: "",

    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSetupState({...setupState, [name]: value})
    };

    let count = 0;
    const done = () => {
        //if user leaves the step blank return so they dont mess up functionality
        setSetupState({...setupState, step: setupState.step + 1, })
        count++;
        console.log(setupState);
    }

    const addUser = () => {
        //make a post to /api/signup and put the
        let newUser = {
            handle: setupState.handle,
            imageUrl: "",
            bio: setupState.bio,
            location: setupState.location,
            email: user.email
        } 
        
        Axios.post('/api/addUser', newUser);
        count++;
        window.location.reload();
    }

    //onClick triggers done which transitions to the next step. 
    //After the last step the button triggers add user where we input them into SQL

    return (
        <> 
            <Typography className={classes.header} variant="h2" color="textPrimary" >
                Step {setupState.step} 
            </Typography>
            {setupState.step === 1 ? <div className={classes.root}>
                <Card className={classes.card} raised>
                    <Typography className={classes.typography} variant="h5" color="textPrimary" >
                        Add your user handle
                    </Typography>
                    <form className={classes.form} noValidate autoComplete="off">
                        <TextField onChange={handleInputChange} name="handle" id="outlined-basic" label="Handle" variant="outlined"/>
                        <Button className={classes.button} onClick={done} color="primary">
                            Add Handle
                        </Button>
                    </form>
                </Card>
            </div> :

            setupState.step === 2 ? <div className={classes.root}>
                <Card className={classes.card} raised>
                    <Typography className={classes.typography} variant="h5" color="textPrimary" >
                        Add a Profile Picture
                    </Typography>
                        <Button className={classes.button} onClick={done} color="primary">
                            Add
                        </Button>
                </Card>
            </div> :

            setupState.step === 3 ? <div className={classes.root}>
                <Card className={classes.card} raised>
                    <Typography className={classes.typography} variant="h5" color="textPrimary" >
                        Add a Bio
                    </Typography>
                    <form className={classes.form} noValidate autoComplete="off">
                        <TextField onChange={handleInputChange} name="bio" id="outlined-basic" label="Bio" variant="outlined" multiline/>
                        <Button className={classes.button} onClick={done} color="primary">
                            Add Bio
                        </Button>
                    </form>
                </Card>
            </div> :

            setupState.step === 4 ? <div className={classes.root}>
                <Card className={classes.card} raised>
                    <Typography className={classes.typography} variant="h5" color="textPrimary" >
                        Add Where You're From
                    </Typography>
                    <form className={classes.form} noValidate autoComplete="off">
                        <TextField onChange={handleInputChange} name="location" id="outlined-basic" label="City" variant="outlined" />
                        <Button className={classes.button} onClick={addUser} color="primary">
                            Done
                        </Button>
                    </form>
                </Card>
            </div> : 

            <div className={classes.root}>
                <Typography className={classes.typography} variant="h5" color="textPrimary" >
                    Welcome!
                </Typography>
            </div>} 
        </>
    );
}