import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from "@material-ui/core/Card";
import Axios from "axios";
import API from "../Util/API";

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
    },
    header: {
        color: "white",
    }
}));

export default function SignupSteps() {

    const { user, getAccessTokenSilently } = useAuth0();
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

    const done = () => {
        //if user leaves the step blank return so they dont mess up functionality
        setSetupState({...setupState, step: setupState.step + 1, })
    }

    const addUser = () => {
        //make a post to /api/signup and put the
        let newUser = {
            handle: setupState.handle,
            bio: setupState.bio,
            location: setupState.location,
            email: user.email
        } 
        API.addUser(newUser)
            .then(res => console.log(res))
            .catch(err => console.log(err));
            
        //metadata
        const domain = "christophernc.us.auth0.com";
        let accessToken;
        const getToken = async () => {
            try {
                accessToken = await getAccessTokenSilently({
                  audience: `https://${domain}/api/v2/`,
                  scope: "read:current_user",
                });
                //add sql user data to auth0 metadata 
                var options = {
                    method: 'PATCH',
                    url: `https://${domain}/api/v2/users/${user.sub}`,
                    headers: {authorization: `Bearer ${accessToken}`, 'content-type': 'application/json'},
                    data: {user_metadata: {
                        handle: setupState.handle,
                        bio: setupState.bio,
                        location: setupState.location,
                    }}
                };
                Axios.request(options).then((response) => {
                    console.log(response.data);
                }).catch((error) => {
                    console.error(error);
                });
            } catch (e) {
                console.log(e.message);
            }
        }

        getToken();
        window.location.reload();
    }

    switch(setupState.step) {
        case 1:
            return (
                <>
                    <Typography className={classes.header} variant="h2" color="textPrimary" >
                        Step {setupState.step}/3
                    </Typography>
                    <div className={classes.root}>
                        <Card className={classes.card} raised>
                            <Typography className={classes.typography} variant="h5" color="textPrimary" >
                                Create your user handle
                            </Typography>
                            <form 
                            className={classes.form} 
                            onSubmit={e => { e.preventDefault() }} 
                            noValidate 
                            autoComplete="off"
                            >
                                <TextField onChange={handleInputChange} required name="handle" id="outlined-basic" label="Handle" variant="outlined" multiline/>
                                <Button className={classes.button} onClick={done} color="primary">
                                    Add Handle
                                </Button>
                            </form>
                        </Card>
                    </div>
                </>
            );
        case 2:
            return (
                <>
                    <Typography className={classes.header} variant="h2" color="textPrimary" >
                        Step {setupState.step}/3
                    </Typography>
                    <div className={classes.root}>
                        <Card className={classes.card} raised>
                            <Typography className={classes.typography} variant="h5" color="textPrimary" >
                                Add Where You're From
                            </Typography>
                            <form 
                            className={classes.form} 
                            onSubmit={e => { e.preventDefault() }}
                            noValidate 
                            autoComplete="off"
                            >
                                <TextField onChange={handleInputChange} name="location" id="outlined-basic" label="City" variant="outlined" />
                                <Button className={classes.button} onClick={done} color="primary">
                                    Done
                                </Button>
                            </form>
                        </Card>
                    </div>
                </>
            );
        case 3:
            return (
                <>
                    <Typography className={classes.header} variant="h2" color="textPrimary" >
                        Step {setupState.step}/3
                    </Typography>
                    <div className={classes.root}>
                        <Card className={classes.card} raised>
                            <Typography 
                                className={classes.typography} 
                                variant="h5" color="textPrimary" >
                                Add a Bio
                            </Typography>
                            <form 
                            className={classes.form} 
                            onSubmit={e => { e.preventDefault() }}
                            noValidate 
                            autoComplete="off"
                            >
                                <TextField 
                                    onChange={handleInputChange} 
                                    name="bio" id="outlined-basic" 
                                    label="Bio" variant="outlined" 
                                    multiline
                                />
                                <Button 
                                    className={classes.button} 
                                    onClick={addUser} color="primary">
                                    Add Bio
                                </Button>
                            </form>
                        </Card>
                    </div>
                </>
            );
            default:
    }
}