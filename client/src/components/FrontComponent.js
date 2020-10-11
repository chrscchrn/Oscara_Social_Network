import React, { useState, useEffect } from "react";
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';


export default function FrontComponent() {


    return (
        <>
            <LoginButton />
            <p>Front but not logged in</p>
        </>
        
    );
}