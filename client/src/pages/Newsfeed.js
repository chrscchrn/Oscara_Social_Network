import React, { Component } from "react";
import Nav from '../components/Nav';
import NewPostContainer from '../components/NewPostContainer';
import axios from 'axios';
import { Grid } from '@material-ui/core';
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
        let recentPostsMarkup = this.state.posts ? (
        this.state.posts.map(post => <Post post={post} key={post.id}/>)
        ) : "No Posts Yet!"

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
                        <NewPostContainer images={this.props.images} imageName={this.props.imageName} handle={this.props.handle}/>
                    </Grid>
                </Grid>
    
                <Grid 
                    container 
                    spacing={0}
                    direction="row" 
                    justify="space-between"
                    alignItems="stretch"
                >
                    <Grid item sm={12}>  
                        {recentPostsMarkup}
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