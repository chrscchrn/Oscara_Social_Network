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

function finishSetup() {
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
                    });
                }
            }).catch(err => {
                console.log(err);
                setUserState({
                    ...userState,
                    new_user: true,
                    uploadedPic: false,
                });
            });
        }
    }, [isAuthenticated]);
    
    useEffect(() => {
        //get profile image here then make a bool to see if they uploaded one yet
        if (isAuthenticated && !isLoading && !userState.new_user) {
            axios.get('/api/user/image/' + user.email)
                .then(response => {
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
    }, [userState.new_user]);

    if (!isLoading && !isAuthenticated) {
        return <FrontComponent/>;
    }
    if (!isLoading && isAuthenticated && userState.new_user === true && userState.uploadedPic === false) {
        return <SignupSteps/>;
    }
    if (!isLoading && isAuthenticated && userState.new_user === false && userState.uploadedPic === false) {
        return (
            <Card raised>
                <Typography variant="h5" color="textPrimary" >
                    Add a Profile Picture
                </Typography>
                <ImageHelper email={user.email}/>
                <Button color="primary" onClick={finishSetup}>
                    Done
                </Button>
            </Card>
        );
    }
    if (!isLoading && isAuthenticated && userState.new_user === false && userState.uploadedPic === true) {
        return <Newsfeed 
            images={SQLImages} 
            imageName={imageName} 
            handle={userState.handle}
        />;
    }
    return <Loading/>;
}