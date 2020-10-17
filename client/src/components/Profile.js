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
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'center',
    marginBottom: 10,
    marginTop: 10,
    overflow: "hidden"
  },
  image: {
    // borderRadius: "180px",
    maxHeight: "50%",
    maxWidth: "50%",
    objectFit: "cover",
  },
  content: {
    padding: 5,
  },
  typography: {
    padding: 20,
  },
}));


const Profile = () => {
  const classes = useStyles();
  const { user, isAuthenticated, isLoading } = useAuth0();
  // const [ userMetadata, setUserMetadata ] = useState({});
  const [ imageName, setImageName ] = useState({});
  const [ userInfo, setUserInfo ] = useState({});
  
  // useEffect(() => {
  //   const getUserMetadata = async () => {
  //     const domain = "christophernc.us.auth0.com";
  
  //     try {
  //       const accessToken = await getAccessTokenSilently({
  //         audience: `https://${domain}/api/v2/`,
  //         scope: "read:current_user",
  //       });
  
  //       const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
  //       const metadataResponse = await fetch(userDetailsByIdUrl, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });
  
  //       const { user_metadata } = await metadataResponse.json();
  //       setUserMetadata(user_metadata);
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   };
  
  //   getUserMetadata();
  // }, []);
  
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
          <Grid item sm={6}>
            <img src={imageName.img} alt={user.name} className={classes.image}/>
          </Grid>
          <Grid item sm={6}>
            <CardContent className={classes.content}>
              <Typography variant="h3" color="textPrimary">
                  <PersonIcon color="disabled"/>
                  {userInfo.handle}
                </Typography>
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