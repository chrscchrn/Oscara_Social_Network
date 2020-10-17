import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';

const styles = {
    card: {
        '& > *': {
            width: '55%',
          },
        display: 'flex',
        marginBottom: 10,
        marginTop: 10,
        overflow: "hidden",
        background: "rgb (240, 245, 245)",
    },
    image: {
        borderRadius: "131px",
    },
    content: {
        padding: 25,
        alignSelf: "baseline"
    },
    button: {
        width: "12em",
        height: "7em",
        padding: "1em, 2em",
        overflow: "auto",
    },
    typography: {
        padding: 5,
    },
}

export class Post extends Component {
    
    render() {

        const { classes, post : { body, createdAt, image, handle, likeCount, id} } = this.props
        var timeDate = new Date(createdAt);
        let when = timeDate.getMonth() + "-" + (timeDate.getDate()) + "-" + timeDate.getFullYear();

        // const like = (identification, likeCount) => {
        //     likeCount + 1;
        //     let postInfo = {
        //         id: identification,
        //         count: likecount,
        //     }
        //     Axios.put('/api/post/like', postInfo)
        //         .then(res => console.log(res))
        //         .catch(err => console.log(err));
        //     return 'disabled'
        // } //disable button after

        return (
            
            <Card className={classes.card} raised>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <img
                        src={image}
                        title="Profile Image"
                        className={classes.image}
                        width="150" height="150"
                    />
                </Grid>

                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <CardContent className={classes.content}>
                        <Typography className={classes.typography} variant="h5" color="textPrimary">{handle}</Typography>
                        <Typography className={classes.typography} variant="body2" color="textSecondary">{when}</Typography>
                        <Typography className={classes.typography} variant="body1">{body}</Typography>
                        <Typography className={classes.typography} variant="body2" color="textSecondary">Likes: {likeCount}</Typography>
                    </CardContent>
                </Grid>

                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Button className={classes.button} color="primary">
                        Like
                    </Button>
                </Grid>
            </Card>
        )
    }
}

export default withStyles(styles)(Post);

