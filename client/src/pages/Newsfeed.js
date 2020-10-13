import React, { useState, useEffect, Component } from "react";
import Nav from '../components/Nav';
import NewPostContainer from '../components/NewPostContainer';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box, Grid } from '@material-ui/core';
import Post from '../components/Post'

// const classes = useStyles();
// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         '& > *': {
//             margin: theme.spacing(0),
//             width: "100%",
//             height: theme.spacing(10),
//         },
//     },
// }));

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
        ) : <p>Loading...?</p>

        return (
            <div>
                <Grid 
                container 
                spacing={0}
                direction="row" 
                justify="space-between"
                alignItems="stretch"
                >
                    <Grid item sm={12}  >  
                        <NewPostContainer />
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
                        <Nav />     
                    </Grid>
                </Grid>
            </div>
        );
    }
    
}

export default Newsfeed;