import React, { useState, useEffect } from "react";
import FrontComponent from '../components/FrontComponent';
import Newsfeed from "./Newsfeed";
import { useAuth0 } from "@auth0/auth0-react";

export default function Front() {

    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <>
            {isAuthenticated ? <Newsfeed /> : <FrontComponent />}
        </>
        
    );
}