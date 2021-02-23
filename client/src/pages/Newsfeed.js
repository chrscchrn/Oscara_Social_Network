import React, { Suspense } from "react";
import Nav from '../components/Nav';
import NewPostContainer from '../components/NewPostContainer';
import axios from 'axios';
import { Button, Grid } from '@material-ui/core';
import API from "../Util/API";

const Post = React.lazy(() => import('../components/Post'));

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

    const [ newPost, setNewPost ]  = React.useState({});
    const [ allPosts, setAllPosts ] = React.useState([]);
    const [ postsToShow, setPostsToShow ] = React.useState([]);
    const [ next, setNext ] = React.useState(postsPerPage);

    React.useEffect(() => {
        API.getPosts()
            .then(res => setAllPosts(res.data))
            .catch(err => console.log(err));
            
        axios.get('/api/images/all')
            .then(res => {
                console.log("images loaded");
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
    postsToShow.map(post => (
        <Suspense>
            <Post userHandle={post.handle} post={post} key={post.id} currentUser={handle} imageName={imageName}/>
        </Suspense>
    ))
    ) : "No Posts Yet!";

    // let newPostMarkup;
    // React.useEffect(() => {
    //     let post = newPost;
    //     newPostMarkup = (<Suspense fallback={<CircularProgress/>}>
    //                         <Post userHandle={post.handle} post={post} key={post.id} currentUser={handle} imageName={imageName}/>
    //                     </Suspense>)
    // }, [newPost]);

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
                        setNewPost={setNewPost}
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
                        {/* {newPostMarkup ? newPostMarkup : null} */}
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