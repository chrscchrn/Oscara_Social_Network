import React, { useState, useEffect, Component } from "react";
import Nav from '../components/Nav';
import Grid from '@material-ui/core/Grid';
import Profile from "../components/Profile";

class ProfilePage extends Component {
    
    render() {

        return (
            <>
                <Grid 
                container 
                spacing={0}
                direction="row" 
                justify="space-between"
                alignItems="flex-start"
                >
                    <Grid item sm={2}>  
                    </Grid>
                    <Grid item sm={12}>  
                        <Profile />
                    </Grid>
                    <Grid item sm={2}>  
                    </Grid>
                </Grid>
                <Grid 
                container 
                spacing={0}
                direction="row" 
                justify="center"
                alignItems="flex-end"
                >
                    <Grid item sm={6}>    
                        <Nav />     
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default ProfilePage;