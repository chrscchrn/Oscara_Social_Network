import React, { useState, useEffect, Component } from "react";
import Nav from '../components/Nav';
import NewPostContainer from '../components/NewPostContainer';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Post from '../components/Post'
import Loading from "../components/Loading";

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
    }
    
    render() {
        let recentPostsMarkup = this.state.posts ? (
        this.state.posts.map(post => <Post post={post} />)
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
                        <NewPostContainer images={this.props.images} imageName={this.props.imageName}/>
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