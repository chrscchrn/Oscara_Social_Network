import React, { useEffect, useState } from "react";
import Nav from '../components/Nav';
import UserProfile from '../components/userProfile';
import Post from '../components/Post';
import Grid from '@material-ui/core/Grid';
import API from "../Util/API";

function UsersPage() {

    const [ posts, setPosts ] = useState({});
    const [ user , setUser ] = useState({});

    useEffect(() => {
        var handle = window.location.href[window.location.href.length - 1];
        for (let i = window.location.href.length - 2; i > 0, window.location.href[i] !== '/'; i--) {
            handle = window.location.href[i] + handle
        }
        API.getUserByHandle(handle)
            .then(res => setUser(res.data))
            .catch(err => console.log(err));
    }, []);
    
    useEffect(() => {
        API.getUsersPosts(user.email)
            .then(res => { setPosts({ posts: res.data }) })
            .catch(err => console.log(err));
    }, [user])
    
    let recentUserPosts = posts.posts ? (
        posts.posts.map(post => <Post post={post} key={post.id} otherUser={true} />)
    ) : "No Posts Yet!";

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
                    <UserProfile userData={user} postData={posts}/>
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
                    <ul style={{listStyleType: "none", paddingInlineStart: "0px"}}>
                        {recentUserPosts}
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

export default UsersPage;