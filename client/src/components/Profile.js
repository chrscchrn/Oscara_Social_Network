import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./Loading";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


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

  if (isLoading) return <Loading/>;
  return (
    isAuthenticated && (
      <Card raised className={classes.card} container>
        <CardMedia
          image={user.picture}
          title={user.name}
        />
        <img src={user.picture} alt={user.name} className={classes.image}/>
        <CardContent className={classes.content}>
          <Typography variant="h4" color="textPrimary">{userMetadata.handle}</Typography>
          <Typography variant="body2" color="textSecondary">{userMetadata.location}</Typography>
          <Typography variant="h6" color="textPrimary">Bio</Typography>
          <Typography variant="body1">{userMetadata.bio}</Typography>
        </CardContent>
      </Card>
    )
  );
};

export default Profile;