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
import { Avatar } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  card: {
    display: 'center',
    marginBottom: 10,
    marginTop: 10,
    overflow: "hidden",
    padding: 5,
  },
  // image: {
  //   // borderRadius: "180px",
  //   width: "200px !important",
  //   height: "200px !important",
  //   // objectFit: "cover",
  // },
  content: {
    padding: 5,
  },
  typography: {
    padding: 20,
  },
  largeIcon: {
    width: "40px",
    height: "40px",
  }, 
  bio: {
    marginLeft: "25px"
  }
}));

const Profile = () => {
  const classes = useStyles();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [ imageName, setImageName ] = useState({});
  const [ userInfo, setUserInfo ] = useState({});
  
  //get profile pic
  useEffect(() => {
    if (isAuthenticated) {
      axios.get('/api/user/image/' + user.email)
        .then(response => {
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
          <AlternateEmailIcon className={classes.largeIcon} size="large" color="primary"/>
          {userInfo.handle}
        </Typography>
      );
    } else {
      return (
      <Typography variant="h5" color="textPrimary">
        <AlternateEmailIcon color="primary"/>
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
        justify="center"
        alignItems="center"
        >
          <Grid item sm={4} className={classes.image} style={{textAlign: "-webkit-center"}}>
            <Avatar className={classes.image + " image"} src={imageName.img} alt={user.name} style={{height: "200px", width: "200px"}} />
            {/* <img className={classes.image, "image"} src={imageName.img} alt={user.name} height="250"/> */}
          </Grid>
          <Grid item sm={8}>
            <CardContent className={classes.content}>
              {BreakpointHelper()}
              <Typography variant="body1" color="textSecondary">
                <LocationOnIcon color="primary"/>
                <strong>
                  {userInfo.location}
                </strong>
              </Typography>
              <Typography variant="h5" color="textPrimary"></Typography>
              <br/>
              <br/>
              <Typography variant="body1" className={classes.bio}>
                <strong>
                  {userInfo.bio}
                </strong>
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    )
  );
};

export default Profile;