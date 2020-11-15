import React, { useState, useEffect } from "react";
import axios from 'axios';
import Loading from "./Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import  { API_URL } from '../helpers/API_URL';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        overflow: "hidden",
        boxShadow: "0px 0px 20px 0px #252525db",
        borderRadius: 4,
        background: "rgb (240, 245, 245)",
        marginBottom: 10,
        marginTop: 10,
    },
    grid: {
        width: "120%",
    },
    card: {
        // width: "100%",
        padding: 5,
        marginTop: "auto",
        display: 'flex',
    },
    button: {
        width: "8em",
        height: "5em",
        marginTop: "2.5em",
        marginRight: "10",
        padding: "1em, 2em",
        overflow: "auto",
    },
    image: {
        // borderRadius: "180px",
        maxHeight: "200px",
        maxWidth: "200px",
        // objectFit: "cover",
    },
    typography: {
        padding: 5,
    },
}));

function NewPostContainer(props) {

    const classes = useStyles();
    const [ postState, setPostState ] = useState({ body: "" });
    const [ userInfo, setUserInfo ] = useState({});

    useEffect(() => {
        axios.get('/api/user/' + user.email)
        .then(res  => {
          setUserInfo(res.data);
        }).catch(err => {
          console.log(err);
        });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPostState({...postState, [name]: value})
    };

    const { user, isloading } = useAuth0();
    const callAPI = async () => {
        if (!isloading) {
            try {
                if (props.imageName.includes('.')) {
                    console.log(props.imageName)
                    axios.post('/api/post', {
                        body: postState.body,
                        likeCount: 0,
                        commentCount: 0,
                        UserId: user.email,
                        handle: userInfo.handle,
                        image: props.imageName,
                    }).then((response) => {
                        console.log(response);
                        window.location.reload();
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            } catch(err) {
                console.log(err)
            }
        }
    }

    const configureImage = image => {
        return API_URL + "/" + image;
    }

    const BreakpointHelper = () => {
        const theme = useTheme();
        const matches = useMediaQuery(theme.breakpoints.up("sm"));
        
        if (matches) {
          console.log("this size");
          return (
            <Typography className={classes.typography} variant="h5" color="textPrimary" >
                <AlternateEmailIcon/>
                <strong>{props.handle}</strong>
            </Typography>
          );
        } else {
          console.log("other size");
          return (
            <Typography className={classes.typography} variant="subtitle1" color="textPrimary" >
                <strong>{props.handle}</strong>
            </Typography>
          );
        }
    }
    
    return (
        <div className={classes.root}>
            <Card className={classes.card} raised>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    sm={4}
                    style={{height: "200px", width: "200px"}}
                >   
                    <Avatar 
                        src={configureImage(props.imageName)} 
                        className={classes.image, "image"} 
                        key={props.imageName} 
                        alt={props.imageName}
                        style={{height: "200px", width: "200px"}}
                    />
                </Grid>        

                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                    sm={5}
                    className={classes.grid}
                >   
                    <div className="profile-header">
                        {BreakpointHelper()}
                        <TextField 
                            className={"post-form"}
                            multiline 
                            onChange={handleInputChange} 
                            name="body" 
                            id="filled-basic" 
                            label="What's on your mind?" 
                            variant="filled"
                            rows={5}
                        />
                    </div>
                </Grid>

                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    sm={3}
                >   
                    <Button className={classes.button, "post-button"} onClick={callAPI} variant="outlined" color="primary">
                        Post
                    </Button>
                </Grid>
            </Card>
        </div>
    );
}

export default withAuthenticationRequired(NewPostContainer, {
    onRedirecting: () => <Loading />
});
