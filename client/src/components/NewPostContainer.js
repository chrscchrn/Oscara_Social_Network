import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
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
        width: '40%',
      },
    },
    typography: {
        padding: 20,
        float: "left",
        marginLeft: 10,
    },
    card: {
        width: "100%",
        textAlign: "center",
    },
    button: {
        margin: 5,
        marginRight: "2%",
        float: "right",
        height: 65,
        width: "25%"
    }
}));

//multer image upload, tiny png, express-fileupload

function NewPostContainer() {

    const classes = useStyles();

    const [postState, setPostState] = useState({ body: "" });

    const [userMetadata, setUserMetadata] = useState({});
  
  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "christophernc.us.auth0.com";
  
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
  
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        const { user_metadata } = await metadataResponse.json();
        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };
  
    getUserMetadata();
  }, []);

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
                console.log(postState, userMetadata.handle);
                axios.post('/api/post', {
                    body: postState.body,
                    likeCount: 0,
                    commentCount: 0,
                    UserId: user.email,
                    handle: userMetadata.handle,
                }).then((response) => {
                    console.log(response);
                    window.location.reload();
                }).catch((error) => {
                    console.log(error);
                });
            } catch(err) {
                console.log(err)
            }
        }
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card} raised>
                <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="flex-start"
                >
                    <Typography className={classes.typography} variant="h5" color="textPrimary" >
                        Create Post
                    </Typography>
                </Grid>
                
                <Grid
                    container
                    direction="column"
                    justify="space-around"
                    alignItems="stretch"
                >
                    <form className={classes.form} onSubmit={e => {e.preventDefault()}} noValidate autoComplete="off">
                        <TextField onChange={handleInputChange} name="body" id="outlined-basic" label="What's on your mind?" variant="outlined"/>
                        <Button className={classes.button} onClick={callAPI} color="primary">
                            Post
                        </Button>
                    </form>
                </Grid>
            </Card>
        </div>
    );
}

export default withAuthenticationRequired(NewPostContainer, {
    onRedirecting: () => <Loading />
});
