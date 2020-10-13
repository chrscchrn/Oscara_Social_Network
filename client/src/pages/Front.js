import React, { useState, useEffect } from "react";
import FrontComponent from '../components/FrontComponent';
import Newsfeed from "./Newsfeed";
import { useAuth0 } from "@auth0/auth0-react";
import SignupSteps from "./SignupSteps";
import axios from 'axios';

export default function Front() {

    const [userState, setUserState] = useState({
        new_user: true
    });

    const { user, isAuthenticated, isLoading } = useAuth0();
    
    if (isLoading) {
        return <div>Loading ...</div>;
    } else if (isAuthenticated && !isLoading) {
        axios.get('/api/user/' + user.email)
            .then(res => {
                let obj = { new_user : userState.new_user }
                if (res.data == null) {
                    setUserState(obj)
                } else {
                    setUserState(obj)
                }
            }).catch(err => {
                console.log(err);
            })
    }

;

    return (
        <>
            {(isAuthenticated && userState.new_user) ? <SignupSteps /> 
            : (isAuthenticated && !userState.new_user) ? <Newsfeed /> 
            : <FrontComponent /> }
        </>
        
    );
}