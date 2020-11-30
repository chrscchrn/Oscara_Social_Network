import React from "react";
import Nav from '../components/Nav';
import NewPostContainer from '../components/NewPostContainer';
import axios from 'axios';
import { Button, Grid } from '@material-ui/core';
import Post from '../components/Post'

function Newsfeed(props) {

    const [ loadMoreButton, setLoadMoreButton ] = React.useState(
        <Button style={{
            marginBottom: "120px", 
            marginTop: "50px", 
            color: "#3d4647", 
            backgroundColor: "#c8c1c199"}}
            onClick={HandleLoadMorePosts}
        >
            <strong>Load More Posts</strong>
        </Button>
    );

    const postsPerPage = 15;
    // let arrayForHoldingPosts = [];

    const [ allPosts, setAllPosts ] = React.useState([]);
    const [ postsToShow, setPostsToShow ] = React.useState([]);
    const [ next, setNext ] = React.useState(postsPerPage);

    React.useEffect(() => {
        axios.get('/api/posts')
            .then(res => {
                setAllPosts(res.data)
            })
            .catch(err => console.log(err));
        axios.get('/api/images/all')
            .then(res => {
                console.log("imgs");
            })
            .catch(err => console.log(err));
    }, []);

    React.useEffect(() => {
        loopWithSlice(0, postsPerPage);
    }, [allPosts]);
    
    const loopWithSlice = (start, end) => {
        const slicedPosts = allPosts.slice(start, end);
        // arrayForHoldingPosts = [];
        setPostsToShow(...postsToShow, slicedPosts);
        console.log(allPosts, "Hello?");
    };

    function HandleLoadMorePosts() {
        if (allPosts.length === postsToShow.length) {
            setLoadMoreButton( <Button disabled/> );
        }  else {
            loopWithSlice(0, next + postsPerPage);
            setNext(next + postsPerPage);
        }
    }

    let { handle, images, imageName } = props;
    let recentPosts = postsToShow ? (
    postsToShow.map(post => <Post userHandle={post.handle} post={post} key={post.id} currentUser={handle}/>)
    ) : "No Posts Yet!";

    return (
        <>
            <Grid 
                container 
                spacing={0}
                direction="row" 
                justify="center"
                alignItems="center"
            >
                <Grid item sm={12}  >  
                    <NewPostContainer 
                        images={images} 
                        imageName={imageName} 
                        handle={handle}
                    />
                </Grid>
            </Grid>

            <Grid 
                container 
                spacing={0}
                direction="row" 
                justify="center"
                alignItems="center"
            >
                <Grid item sm={12}>  
                    <ul style={{listStyleType: "none", paddingInlineStart: "0px"}}>
                        {recentPosts}
                    </ul>    
                </Grid>
            </Grid>
            <Grid 
                container 
                spacing={0}
                direction="row" 
                justify="center"
                alignItems="center"
            >
                <Grid item sm={12} style={{textAlign: "-webkit-center"}}>  
                    {loadMoreButton}
                </Grid>
            </Grid>

            <Grid 
                container 
                spacing={0}
                direction="row" 
                justify="center"
                alignItems="stretch"
            >
                <Grid item sm={6}>    
                    <Nav/>
                </Grid>
            </Grid>
        </>
    );
}

export default Newsfeed;