import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';

//MUI
const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        minWidth: 200,
        objectFit: 'cover',
        // border radius to a circle!
    },
    content: {
        padding: 25,
    }
}

export class Post extends Component {
    render() {
        const { classes, post : { body, createdAt, userImage, userHandle, likeCount, commentCount} } = this.props
        return (
            <Card className={classes.card}>
                <CardMedia
                image={userImage}
                title="Profile Image"
                className={classes.image}
                />
                
                <CardContent className={classes.content}> {/*LINK TO OTHER PROFILEs? */}
                    <Typography varient="h5" color="textPrimary">{userHandle}</Typography>
                    <Typography variant="body2" color="textSecondary">{createdAt}</Typography>
                    <Typography variant="body1">{body}</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Post);
