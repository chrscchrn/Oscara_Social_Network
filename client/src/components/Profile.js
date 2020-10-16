import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./Loading";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    marginBottom: 10,
    marginTop: 10,
    overflow: "hidden"
  },
  image: {
    minWidth: "20%",
    objectFit: 'cover',
    float: "left",
    borderRadius: 1000,
  },
  content: {
    padding: 25,
  },
  typography: {
    padding: 20,
    float: "left"
  },
}));


const Profile = () => {
  const classes = useStyles();
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState({});
  const [imageName, setImageName] = useState({});
  
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
  
  //get profile pic
  useEffect(() => {
    if (isAuthenticated) {
        axios.get('/api/user/image/' + user.email)
        .then(response  => {
          setImageName({ img: response.data.fileName });
        }).catch(err => {
          console.log(err);
        });
    }

}, [isAuthenticated, isLoading]);

  if (isLoading) return <Loading/>;
  return (
    isAuthenticated && (
      <Card raised className={classes.card} container>
        <img src={imageName.img} alt={user.name} className={classes.image} height="250" width="250"/>
        <CardContent className={classes.content}>
          <Typography variant="h3" color="textPrimary">{userMetadata.handle}</Typography>
          <Typography variant="body1" color="textSecondary">{userMetadata.location}</Typography>
          <Typography variant="h5" color="textPrimary">Bio: </Typography>
          <Typography variant="body1">{userMetadata.bio}</Typography>
        </CardContent>
      </Card>
    )
  );
};

export default Profile;