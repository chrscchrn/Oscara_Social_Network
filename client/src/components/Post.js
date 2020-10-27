import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const styles = {
    card: {
        '& > *': {
            width: '55%',
          },
        padding: 5,
        display: 'flex',
        margin: "0 auto",
        marginBottom: 10,
        marginTop: 10,
        // overflow: "hidden",
        background: "rgb (240, 245, 245)",
    },
    image: {
        borderRadius: "180px",
        maxHeight: "200px",
        maxWidth: "200px",
        objectFit: "cover",
    },
    content: {
        width: "-webkit-fill-available",
        minWidth: 120,
    },
    button: {
        width: "7em",
        height: "5em",
        marginTop: "2.5em",
        padding: "1em, 2em",
        overflow: "auto",
    },
    typography: {
        padding: 5,
        textDecoration: "none",
    },
}

export class Post extends Component {

    render() {
        const { classes, post : { body, createdAt, image, handle, likeCount, id} } = this.props;
        var timeDate = new Date(createdAt);
        let when = timeDate.getMonth() + "-" + (timeDate.getDate()) + "-" + timeDate.getFullYear();
        let userHandle = this.props.userHandle;

        function like(event) {
            event.preventDefault();
            event.persist();
            // console.log(event.target.id);
            let postId = event.target.id;
                Axios.get("/api/post/like/" + postId + "/" + userHandle)
                .then(res => {
                    if (res.data.error) {
                        alert(res.data.error);
                        return;
                    }
                    console.log("generic res: ", res.data[0]); //<== if successful its the number of likes this post should have
                    window.location.reload();
                }).catch(err => {
                    console.log("error: ", err);
                    alert("other error", err);
                });
        }

        return (
            <Card className={classes.card} raised>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    {this.props.otherUser ? 
                    <img
                        alt="This User's Profile Image"
                        src={"../" + image}
                        title="Profile Image"
                        className={classes.image, "image"}
                        width="150"
                    /> 
                    :
                    <img
                        alt="This User's Profile Image"
                        src={image}
                        title="Profile Image"
                        className={classes.image, "image"}
                        width="150"
                    />}

                </Grid>

                <Grid
                    container
                    direction="column"
                    justify="space-around"
                    alignItems="baseline"
                >
                    <CardContent className={classes.content}>
                        <Link to={"/u/" + handle} className={classes.typography}>
                            <Typography variant="h5" color="textPrimary">
                                <strong id="one-point-one-rem">{handle}</strong>
                            </Typography>
                        </Link>
                        <Typography className={classes.typography} variant="body2" color="textSecondary">
                            {when}
                        </Typography>
                        <Typography className={classes.typography} variant="body1">
                            {body}
                        </Typography>
                        <Typography className={classes.typography} variant="body2" color="textSecondary">
                            {likeCount} Likes
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >   
                    <form onSubmit={like} id={id} key={id}>
                        <Button type="submit" className={classes.button} color="primary" key={id} onClick={this.forceUpdate}>
                            Like
                        </Button>
                    </form>
                </Grid>
            </Card>
        )
    }
}

export default withStyles(styles)(Post);

