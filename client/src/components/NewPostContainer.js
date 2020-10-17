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
// import jwt_decode from "jwt-decode";
import  { API_URL } from '../helpers/API_URL';

const useStyles = makeStyles((theme) => ({
    root: {
        overflow: "hidden",
        boxShadow: "0px 0px 20px 0px #252525db",
        borderRadius: 5,
        background: "rgb (240, 245, 245)",
    },
    form: {
        '& > *': {
            margin: theme.spacing(0),
            width: '150%',
        },
    },
    card: {
        width: "100%",
        padding: 10,
        marginTop: "auto",
        display: 'flex',
    },
    button: {
        width: "12em",
        height: "7em",
        padding: "1em, 2em",
        overflow: "auto",
    },
    image: {
        borderRadius: "131px",
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
    
    return (
        <div className={classes.root}>
            <Card className={classes.card} raised>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >   
                    <Typography className={classes.typography} variant="h5" color="textPrimary" >
                        {props.handle}
                    </Typography> 
                    {props.images.map(image => (
                        image === props.imageName ? 
                        <img 
                        src={configureImage(image)} 
                        className={classes.image} 
                        key={image} 
                        alt={image} 
                        width="150" 
                        height="150"
                        />
                        : null
                    ))}
                </Grid>                    
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >   
                    <div style={{alignSelf: "flex-start"}}>
                        <Typography className={classes.typography} variant="h5" color="textPrimary">
                            Create Post
                        </Typography>
                        <TextField 
                            className={classes.form} 
                            multiline 
                            onChange={handleInputChange} 
                            name="body" 
                            id="outlined-basic" 
                            label="What's on your mind?" 
                            variant="outlined"
                            rows={5}
                            />
                    </div>
                </Grid>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >   
                    <Button className={classes.button} onClick={callAPI} color="primary">
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
