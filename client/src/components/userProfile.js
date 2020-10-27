import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react/";
import Loading from "./Loading";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'center',
        marginBottom: 10,
        marginTop: 10,
        overflow: "hidden"
    },
    image: {
        // borderRadius: "180px",
        maxHeight: "350px",
        maxWidth: "350px",
        // objectFit: "cover",
    },
    content: {
        padding: 5,
    },
    typography: {
        padding: 20,
    },
    largeIcon: {
        width: "40px",
        height: "40px",
    }
}));

const userProfile = (props) => {
    const classes = useStyles();
    const { isAuthenticated, isLoading } = useAuth0();
    const [ imageName, setImageName ] = useState({});

    useEffect(() => {
        if (isAuthenticated && props.userData.email) {
            axios.get('/api/user/image/' + props.userData.email)
            .then(response => {
                setImageName({ img: response.data.fileName });
            }).catch(err => {
                console.log(err);
            });
        }
    }, [props]);
  
    const BreakpointHelper = () => {
        const theme = useTheme();
        const matches = useMediaQuery(theme.breakpoints.up("sm"));
        
        if (matches) {
            return (
                <Typography variant="h3" color="textPrimary">
                <AlternateEmailIcon className={classes.largeIcon} size="large"/>
                {props.userData.handle}
                </Typography>
            );
        } else {
            return (
            <Typography variant="h5" color="textPrimary">
                <AlternateEmailIcon/>
                {props.userData.handle}
            </Typography>
            );
        }
    }
    if (isLoading) return <Loading/>;
    return (
        isAuthenticated && (
            <Card raised className={classes.card}>
                <Grid 
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                >
                    <Grid item sm={4}>
                        <img className={classes.image, "image"} src={"../" + imageName.img} alt={"@" + props.userData.handle} height="250"/>
                    </Grid>
                    <Grid item sm={8}>
                        <CardContent className={classes.content}>
                            {BreakpointHelper()}
                            <Typography variant="body1" color="textSecondary">
                                <LocationOnIcon color="disabled"/>
                                {props.userData.location}
                            </Typography>
                            <Typography variant="h5" color="textPrimary">Bio: </Typography>
                            <Typography variant="body1">{props.userData.bio}</Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        )
    );
};

export default userProfile;