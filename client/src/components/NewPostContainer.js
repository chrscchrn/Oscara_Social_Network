import React, { useState, useEffect } from "react";
// import { makeStyles } from '@material-ui/core/styles';
// import { Paper, Box, Grid } from '@material-ui/core';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "./Loading";
import axios from 'axios';
import jwt_decode from "jwt-decode";


function NewPostContainer() {

    const { user, isAuthenticated, getAccessTokenSilently, context } = useAuth0();
    const callAPI = async () => {
        try {
            const token = await getAccessTokenSilently();
            var decoded = jwt_decode(token);
            console.log(decoded, user);
            //HERE
            axios.post('/api/post', {
                body: "first post",
                likeCount: 0,
                commentCount: 0,
                user: decoded,
                user2: user,
            }).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });

        } catch(err) {
            console.log(err)
        }

    }

    return (
        <div>
            <button onClick={callAPI}>test post</button>
            <p>New Post</p>
        </div>
    );
}

export default withAuthenticationRequired(NewPostContainer, {
    onRedirecting: () => <Loading />
});