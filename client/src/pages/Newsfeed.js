import React, { Component } from "react";
import Nav from '../components/Nav';
import NewPostContainer from '../components/NewPostContainer';
import axios from 'axios';
import { Button, Grid } from '@material-ui/core';
import Post from '../components/Post'

class Newsfeed extends Component {

    state = {
        posts: null
    }

    componentDidMount() {
        axios.get('/api/posts')
        .then(res => {
            console.log(res);
            this.setState({
                posts: res.data
            })
        })
        .catch(err => console.log(err));

        axios.get('/api/images/all')
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));

    }
    
    render() {
        let recentPosts = this.state.posts ? (
        this.state.posts.slice(0, 15).map(post => <Post userHandle={this.props.handle} post={post} key={post.id}/>)
        ) : "No Posts Yet!"
             
        
        // function loadMorePosts() {

        //     recentPosts.concat(this.state.posts.slice(16));
        // }

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
                            images={this.props.images} 
                            imageName={this.props.imageName} 
                            handle={this.props.handle}
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
                        {recentPosts}
                        {/* more posts */}
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
                        <Button style={{marginBottom: "120px", 
                            marginTop: "50px", 
                            color: "#3d4647", 
                            backgroundColor: "#c8c1c199"}}
                            // onClick={loadMorePosts}
                        >
                            <strong>Load More Posts</strong>
                        </Button>
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
}

export default Newsfeed;