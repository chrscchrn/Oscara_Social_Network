import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
        // width: "50%",
        // objectFit: 'cover',
        // float: "left",
        // border radius to a circle!
        borderRadius: "131px",
    },
    content: {
        padding: 25,
        alignSelf: "baseline"
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
}));

const UserPosts = (props) => {

    const { classes, post : { body, createdAt, image, handle, likeCount, commentCount} } = this.props
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
                <img

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

export default UserPosts
