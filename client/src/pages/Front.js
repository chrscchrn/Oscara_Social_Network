import React, { useState, useEffect } from "react";
import FrontComponent from '../components/FrontComponent';
import Newsfeed from "./Newsfeed";
import { useAuth0 } from "@auth0/auth0-react";
import SignupSteps from "./SignupSteps";
import axios from 'axios';
import Loading from "../components/Loading";
import Nav from '../components/Nav';

export default function Front() {

    const [userState, setUserState] = useState({ 
        new_user: false 
    });

    const { user, isAuthenticated, isLoading } = useAuth0();
    
    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            axios.get('/api/user/' + user.email)
                .then(res => {
                    if (res.data == null) {
                        setUserState({
                            new_user: true
                        })
                    } else {
                        setUserState({
                            new_user: false
                        })
                    }
                }).catch(err => {
                    console.log(err);
                })
        }
    }, [isAuthenticated, isLoading]);


    return (
        <>
            {isLoading ? <Loading/>: null}
            { (isAuthenticated && userState.new_user) ? <SignupSteps /> 
            : (isAuthenticated && !userState.new_user) ? <Newsfeed /> //not the best way to determine a new user
            : null }
            {!isAuthenticated && !isLoading ? <FrontComponent /> : null}
        </>
        
    );
}