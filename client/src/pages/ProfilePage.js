import React, { useState, useEffect } from "react";
import Nav from '../components/Nav';
import Grid from '@material-ui/core/Grid';

export default function ProfilePage() {
    
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
                    col
                </Grid>
                <Grid item sm={8}>  
                    col
                </Grid>
                <Grid item sm={2}>  
                    col
                </Grid>
            </Grid>
            <Grid 
            container 
            spacing={0}
            direction="row" 
            justify="center"
            alignItems="flex-end"
            >
                <Grid item sm={12}>    
                    <Nav />     
                </Grid>
            </Grid>
        </>
    );
}