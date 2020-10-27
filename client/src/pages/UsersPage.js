import React, { useEffect, useState } from "react";
import Nav from '../components/Nav';
import UserProfile from '../components/userProfile';
import Post from '../components/Post';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';


function UsersPage() {

    const [ posts, setPosts ] = useState({});
    const [ user , setUser ] = useState({});

    //get the email first, then the profile info and posts
    useEffect(() => {
        var handle = window.location.href.slice(window.location.href.indexOf('u') + 2);
        axios.get('/api/userhandle/' + handle)
        .then(res => {
            setUser(res.data);
        }).catch(err => console.log(err));
    }, [])
    
    useEffect(() => {
        axios.get('/api/posts/' + user.email)
        .then(res => {
            setPosts({
                posts: res.data
            });
        }).catch(err => console.log(err));
    }, [user])
    
    let recentUserPosts = posts.posts ? (
        posts.posts.map(post => <Post post={post} key={post.id} otherUser={true} />)
    ) : "No Posts Yet!"
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
                {/* BUILD PROFILE PAGE FOR OTHER PEOPLE */}
                    <UserProfile />
                </Grid>
                <Grid item sm={2}>  
                </Grid>
            </Grid>
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
                    {recentUserPosts}
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

export default UsersPage;