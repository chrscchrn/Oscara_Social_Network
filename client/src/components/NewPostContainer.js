import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "./Loading";
import axios from 'axios';
import jwt_decode from "jwt-decode";

const useStyles = makeStyles((theme) => ({
    root: {

    },
    form: {
      '& > *': {
        margin: theme.spacing(1),
        width: '40ch',
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

function NewPostContainer() {

    const classes = useStyles();

    const [postState, setPostState] = useState({ 
        body: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPostState({...postState, [name]: value})
    };

    const { user, isAuthenticated, getAccessTokenSilently, isloading } = useAuth0();
    const callAPI = async () => {
        if (!isloading) {
            try {
                const token = await getAccessTokenSilently();
                var decoded = jwt_decode(token);
                console.log(decoded, user);
                axios.post('/api/post', {
                    body: postState.body,
                    likeCount: 0,
                    commentCount: 0,
                    UserId: user.email,
                    handle: "notDoneYet"
                }).then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                });
            } catch(err) {
                console.log(err)
            }
        }
    }
//multer image upload, tiny png, express-fileupload
    return (
        <div className={classes.root}>
            <Card className={classes.card} raised>
                <Typography className={classes.typography} variant="h5" color="textPrimary" >
                    Make A Post
                </Typography>
                <form className={classes.form} noValidate autoComplete="off">
                <TextField onChange={handleInputChange} name="handle" id="outlined-basic" label="What's going on?" variant="outlined"/>
                <Button className={classes.button} onClick={callAPI} color="primary">
                    Post
                </Button>
            </form>
            </Card>
        </div>
    );
}

export default withAuthenticationRequired(NewPostContainer, {
    onRedirecting: () => <Loading />
});
