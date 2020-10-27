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

const Profile = () => {
  const classes = useStyles();
  const { user, isAuthenticated, isLoading } = useAuth0();
  // const [ userMetadata, setUserMetadata ] = useState({});
  const [ imageName, setImageName ] = useState({});
  const [ userInfo, setUserInfo ] = useState({});
  
  //get profile pic
  useEffect(() => {
    if (isAuthenticated) {
      axios.get('/api/user/image/' + user.email)
        .then(response  => {
          setImageName({ img: response.data.fileName });
        }).catch(err => {
          console.log(err);
        });
      axios.get('/api/user/' + user.email)
        .then(res  => {
          setUserInfo(res.data);
        }).catch(err => {
          console.log(err);
        });
    }
  }, [isAuthenticated, isLoading]);

  const BreakpointHelper = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));
    
    if (matches) {
      return (
        <Typography variant="h3" color="textPrimary">
          <AlternateEmailIcon className={classes.largeIcon} size="large"/>
          {userInfo.handle}
        </Typography>
      );
    } else {
      return (
      <Typography variant="h5" color="textPrimary">
        <AlternateEmailIcon/>
        {userInfo.handle}
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
            <img className={classes.image, "image"} src={imageName.img} alt={user.name} height="250"/>
          </Grid>
          <Grid item sm={8}>
            <CardContent className={classes.content}>
              {BreakpointHelper()}
              <Typography variant="body1" color="textSecondary">
                <LocationOnIcon color="disabled"/>
                {userInfo.location}
              </Typography>
              <Typography variant="h5" color="textPrimary">Bio: </Typography>
              <Typography variant="body1">{userInfo.bio}</Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    )
  );
};

export default Profile;