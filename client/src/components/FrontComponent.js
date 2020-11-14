import React from "react";
import Container from '@material-ui/core/Container';


export default function FrontComponent() {

    return (
        // <React.Fragment>
            <Container maxWidth="md">
                <h1>Hey! Welcome to the new social network, Oscara!</h1>
                <p>1) Sign up or login with an email and password. </p>
                <p>2) Upload a profile picture by going to file explorer, selecting a photo, and pressing 'upload photo' on the form. </p>
                <p>3) Click 'add' and you'll be taken to the newsfeed!</p> 
                <p>4) Update your status, like other posts, and browse Oscara posts. You can view other profiles by clicking on a users handle.</p>
                <img src="images/osc.png" alt="Oscara Logo" height="500" style={{float: "right"}}/>
            </Container>
        // </React.Fragment>
        
    );
}