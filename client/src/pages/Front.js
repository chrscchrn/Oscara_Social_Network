import React, { useState, useEffect } from "react";
import FrontComponent from '../components/FrontComponent';
import Loading from "../components/Loading";
import ImageHelper from "../components/ImageHelper";
import Newsfeed from "./Newsfeed";
import SignupSteps from "./SignupSteps";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function refresh() {
    window.location.reload();
}

export default function Front() {

    const [ userState, setUserState ] = useState({ new_user: true });
    const [ SQLImages, setSQLImages ] = useState([]);
    const [ imageName, setImageName ] = useState([]);
    const { user, isAuthenticated, isLoading } = useAuth0();
    
    useEffect(() => {
        
        if (isAuthenticated) {
            axios.get('/api/user/' + user.email)
            .then(res => {
                if (res.data.email !== null) {
                    setUserState({
                        ...userState,
                        new_user: false,
                        handle: res.data.handle
                    })
                }
            }).catch(err => {
                console.log(err);
            });
        }
        
        //get profile image here then make a bool to see if they uploaded one yet
        if (isAuthenticated && !isLoading && !userState.new_user) {
            axios.get('/api/user/image/' + user.email)
                .then(response => {
                    console.log("moment of truth", response);
                    if (response.data.data === null) {
                        setUserState({...userState, uploadedPic: false });
                    } else {
                        setUserState({...userState, uploadedPic: true});
                        setSQLImages(response.data.data);
                        setImageName(response.data.fileName);
                    }
                }).catch(err => {
                    console.log(err);
                });
        }

    }, [isAuthenticated, isLoading, userState.new_user]);
    console.log(userState);
    if (isLoading) {
        return <Loading/>;
    }
    if (!isLoading && !isAuthenticated) {
        return <FrontComponent/>;
    }
    if (!isLoading && isAuthenticated && userState.new_user) {
        return <SignupSteps/>;
    }
    if (!isLoading && isAuthenticated && !userState.new_user && !userState.uploadedPic)  {
        return (
            <Card raised>
                <Typography variant="h5" color="textPrimary" >
                    Add a Profile Picture
                </Typography>
                <ImageHelper email={user.email}/>
                <Button color="primary" onClick={refresh}>
                    Add
                </Button>
            </Card>
        );
    }
    if (isAuthenticated && !userState.new_user && userState.uploadedPic && !isLoading){
        return <Newsfeed 
            images={"user state: ", userState, "user state: ", SQLImages, "user state: ", imageName} 
            imageName={imageName} 
            handle={userState.handle}
        />;
    }
}

