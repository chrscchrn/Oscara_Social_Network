import React, { useState, useEffect } from "react";
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';


export default function FrontComponent() {


    return (
        <>
            <h1>Hey! Welcome to the new social network, Oscara!</h1>
            <div>
                <div>
                    <img src="/images/osccir.png" />
                </div>
                <div>
                    <img src="/images/osc.png" />
                </div>
            </div>
        </>
        
    );
}