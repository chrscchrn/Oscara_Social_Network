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

    const [ userState, setUserState ] = useState({});
    const [ SQLImages, setSQLImages ] = useState([]);
    const [ imageName, setImageName ] = useState([]);

    const { user, isAuthenticated, isLoading } = useAuth0();
    
    useEffect(() => {

        if (isAuthenticated && !isLoading) {
            axios.get('/api/user/' + user.email)
                .then(res => {
                    if (res.data == null) {
                        setUserState({
                            ...userState,
                            new_user: true
                        })
                    } else {
                        setUserState({
                            ...userState,
                            new_user: false
                        })
                    }
                }).catch(err => {
                    console.log(err);
                })
        }

        //get profile image here then make a bool to see if they uploaded one yet
        if (isAuthenticated) {
            axios.get('/api/user/image/' + user.email)
            .then(response  => {
                console.log(response);
                if (response.data == null) {
                    setUserState({...userState, uploadedPic: false });
                } else {
                    console.log(response.data);
                    setUserState({...userState, uploadedPic: true});
                    setSQLImages(response.data.data);
                    setImageName(response.data.fileName);
                }
            })
        }

    }, [isAuthenticated, isLoading]);

    function refresh() {
        window.location.reload();
    }

    return (
        <>
            {isLoading ? <Loading/>: null}
            {!isAuthenticated && !isLoading ? <FrontComponent /> : null}
            { (isAuthenticated && userState.new_user) ? 
            <SignupSteps /> 
            : (isAuthenticated && !userState.new_user && userState.uploadedPic) ? 
            <Newsfeed images={SQLImages} imageName={imageName}/> //not the best way to determine a new user
            : (isAuthenticated && !userState.new_user && !userState.uploadedPic) ?
            <Card raised>
                <Typography variant="h5" color="textPrimary" >
                    Add a Profile Picture
                </Typography>
                <ImageHelper email={user.email}/>
                <Button color="primary" onClick={refresh}>
                    Add
                </Button>
            </Card>  : null}
        </>
        
    );
}

