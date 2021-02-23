import React, { useEffect, useState } from "react";
import Nav from '../components/Nav';
import Profile from "../components/Profile";
import Post from '../components/Post';
import Grid from '@material-ui/core/Grid';
import { useAuth0 } from "@auth0/auth0-react";
import API from "../Util/API";


function ProfilePage() {

    const [ posts, setPosts ] = useState({})
    const { user, isAuthenticated, isLoading } = useAuth0();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {

            API.getUsersPosts(user.email)
                .then(res => setPosts({ posts: res.data }))
                .catch(err => console.log(err));
        }
    }, [user, isLoading])
    
    let recentUserPostsMarkup = posts.posts ? (
        posts.posts.map(post => <Post post={post} />)
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
                <Grid item sm={2}></Grid>
                <Grid item sm={12}><Profile/></Grid>
                <Grid item sm={2}></Grid>
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
                    <ul style={{listStyleType: "none", paddingInlineStart: "0px"}}>
                        {recentUserPostsMarkup}
                    </ul>
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

export default ProfilePage;