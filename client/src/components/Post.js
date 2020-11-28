import React from 'react';
import { Link } from 'react-router-dom';
// import ViewComments from './viewComments';
import TransitionComment from './TransitionComment';
import DeletePost from './DeletePost';
import Axios from 'axios';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Avatar } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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
        background: "rgb(240, 245, 245)",
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
        overflow: "hidden",
    },
    typography: {
        padding: 5,
        textDecoration: "none",
    },
    large: {
        width: "200px",
        height: "200px",
    },
}

function Post(props) {

    const { otherUser, currentUser, classes, userHandle, post : { body, createdAt, image, handle, likeCount, id, replyCount} } = props;
    const [ stateLikeCount, setStateLikeCount ] = React.useState();
    const [ stateReplyCount, setStateReplyCount ] = React.useState();
    const [ replies, setReplies ] = React.useState([]);
    const [ liked, setLiked ] = React.useState(false);
    const [ open, setOpen ] = React.useState(false);

    var timeDate = new Date(createdAt);
    let when = timeDate.getMonth() + "-" + (timeDate.getDate()) + "-" + timeDate.getFullYear();

    React.useEffect(() => {
        setStateLikeCount(likeCount);
        setStateReplyCount(replyCount);
    }, []);

    React.useEffect(() => {
        if (stateReplyCount > 0) {
            Axios.get("/api/reply/" + id)
            .then(res => {
                // console.log(res);
                setReplies(res.data);  
            }).catch(err => {
                console.log(err);
            }) 
        }
    }, [stateReplyCount]);
    
    function like(event) {
        event.preventDefault();
        event.persist();
        let postId = event.target.id;
        Axios.get("/api/post/like/" + postId + "/" + currentUser)
        .then(res => {
            if (res.data.error) {
                setOpen(true);
                return;
            }
            let likes = stateLikeCount;
            likes += 1;
            setStateLikeCount(likes);
        }).catch(err => {
            console.log(err);
            alert("error liking post", err);
        });
        setLiked(true);
    }

    function updateReplyCount() {
        let replies = stateReplyCount;
        replies += 1;
        setStateReplyCount(replies);
    }

    function handleDelete() {
        //DEL POST
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Card className={classes.card} raised>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info">
                You've already liked this post!
                </Alert>
            </Snackbar>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                {otherUser ? 
                <Avatar alt={image} src={"../" + image} className={classes.large}/>
                :
                <Avatar alt={image} src={image} className={classes.large}/>}
            </Grid>

            <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="baseline"
            >
                <CardContent className={classes.content}>
                    <Link to={"/user/" + handle} className={classes.typography}>
                        <Typography variant="h5" color="textPrimary">
                            <strong id="one-point-one-rem">{handle}</strong>
                        </Typography>
                    </Link>
                    <Typography className={classes.typography} variant="body1">
                        <strong>
                            {body}
                        </strong>
                    </Typography>
                    <br/><br/>
                    <Typography className={classes.typography} variant="body2" color="textSecondary">
                        <strong>
                            {when}  
                        </strong>
                    </Typography>
                    {/* <ViewComments replyCount={stateReplyCount} /> */}
                </CardContent>
            </Grid>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >   
                {window.location.pathname === '/profile' ? <DeletePost handleDelete={handleDelete}/> : <p></p>}
                <form onSubmit={like} id={id} key={id}>
                    <Button type="submit" className={classes.button} color="primary" key={id}>
                        <h2>
                            {stateLikeCount} 
                        </h2>
                        {liked ? <FavoriteIcon color="primary"/> : <FavoriteBorderIcon color="primary"/>}
                    </Button>
                </form>
                <TransitionComment 
                    currentUser={currentUser} 
                    postId={id} 
                    parentReplyHandler={updateReplyCount} 
                    replyCount={stateReplyCount} 
                    replies={replies}
                />
            </Grid>
        </Card>
    )
    
}

export default withStyles(styles)(Post);

