import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

//MUI
const styles = {
    card: {
        '& > *': {
            width: '55%',
          },
        display: 'flex',
        marginBottom: 10,
        marginTop: 10,
        overflow: "hidden"
    },
    image: {
        minWidth: "20%",
        objectFit: 'cover',
        float: "left",
        // border radius to a circle!
    },
    content: {
        padding: 25,
    },
    button: {
        // marginTop: "1em",
        width: "12em",
        height: "7em",
        padding: "1em, 2em",
        overflow: "auto",
        // right: 0,
    },
    typography: {
        padding: 5,
        // float: "left"
    },
}

export class Post extends Component {
    
    render() {
        const { classes, post : { body, createdAt, userImage, handle, likeCount, commentCount} } = this.props
        var timeDate = new Date(createdAt);
        let when = timeDate.getMonth() + "-" + (timeDate.getDate()) + "-" + timeDate.getFullYear();
        return (
            <Card className={classes.card} raised>

                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <CardMedia
                        image={userImage}
                        title="Profile Image"
                        className={classes.image}
                    />
                </Grid>

                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <CardContent className={classes.content}> {/*LINK TO OTHER PROFILEs? */}
                        <Typography className={classes.typography} variant="h5" color="textPrimary">{handle}</Typography>
                        <Typography className={classes.typography} variant="body2" color="textSecondary">{when}</Typography>
                        <Typography className={classes.typography} variant="body1">{body}</Typography>
                        <Typography className={classes.typography} variant="body2" color="textSecondary">Likes: {likeCount}</Typography>
                        <Typography className={classes.typography} variant="body2" color="textSecondary">Comments: {commentCount}</Typography>
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
                    <Button className={classes.button} color="primary">
                        Comment
                    </Button>
                </Grid>
            </Card>
        )
    }
}

export default withStyles(styles)(Post);

