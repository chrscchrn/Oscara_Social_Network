import React, { useState, useEffect, Component } from "react";
import Nav from '../components/Nav';
import NewPostContainer from '../components/NewPostContainer';
import FeedContainer from '../components/FeedContainer';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box, Grid } from '@material-ui/core';

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
        // axios.get('/posts')
        //     .then(res => {
        //         this.setState({
        //             posts: res.data
        //         })
        //     })
        //     .catch(err => console.log(err));
    }
    
    render() {
        return (
            <div>
                <p>Newsfeed is working</p>
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
                    <Grid item sm={12}  >  
                        <div >
                            <FeedContainer />
                        </div>
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