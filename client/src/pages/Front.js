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

export default function Front() {

    const [ userState, setUserState ] = useState({
        new_user: true
    });
    const [ SQLImages, setSQLImages ] = useState([]);
    const [ imageName, setImageName ] = useState([]);
    const { user, isAuthenticated, isLoading } = useAuth0();
    
    useEffect(() => {
        
        if (isAuthenticated) {
            axios.get('/api/user/' + user.email)
            .then(res => {
                if (res.data.email !== null) {
                    console.log("newuser is not new");
                    setUserState({
                        new_user: false
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
                if (response.data == null) {
                    setUserState({...userState, uploadedPic: false });
                } else {
                    console.log(response.data);
                    setUserState({...userState, uploadedPic: true});
                    setSQLImages(response.data.data);
                    setImageName(response.data.fileName);
                }
            }).catch(err => {
                console.log(err, "happy cat error");
            });
        }

    }, [isAuthenticated, isLoading, userState.new_user]);

    function refresh() {
        window.location.reload();
    }

    if (isLoading) {
        return <Loading/>;
    }
    if (!isAuthenticated && !isLoading) {
        return <FrontComponent/>;
    }
    if (isAuthenticated && userState.new_user) {
        return <SignupSteps/>;
    }
    if (isAuthenticated && !userState.new_user && !userState.uploadedPic) {
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
    if (isAuthenticated && !userState.new_user && userState.uploadedPic){
        return <Newsfeed images={SQLImages} imageName={imageName}/>;
    }
}

