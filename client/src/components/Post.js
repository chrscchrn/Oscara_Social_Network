import React from 'react';
import { Link } from 'react-router-dom';
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
import Portal from '@material-ui/core/Portal';

const styles = {
    card: {
        '& > *': {
            width: '55%',
        },
        padding: 5,
        display: 'flex',
        margin: "0 auto",
        marginBottom: 8,
        marginTop: 8,
        // background: "rgb(240, 245, 245)",
    },
    replyCard: {
        width: "50%",
        paddingLeft: "5%",
        paddingRight: "5%",
        textAlignLast: "start",
        marginTop: 5
    },
    ul: {
        paddingInlineStart: "0px",
        listStyleType: "none",
        textAlign: "-webkit-center",
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
        maxWidth: 240,
        padding: 0,
    },
    button: {
        width: "7em",
        height: "5em",
        padding: "1em, 2em",
        overflow: "hidden",
    },
    typography: {
        padding: 5,
        textDecoration: "none",
    },
}

function Post(props) {
//userHandle
    const { imageName, otherUser, currentUser, classes, post : { body, createdAt, image, handle, likeCount, id, replyCount} } = props;
    const [ stateLikeCount, setStateLikeCount ] = React.useState();
    const [ stateReplyCount, setStateReplyCount ] = React.useState();
    const [ replies, setReplies ] = React.useState([]);
    const [ open, setOpen ] = React.useState(false);
    const [ showReplies, setShowReplies ] = React.useState(false);
    
    const container = React.useRef(null);
    const handleShowReplies = () => {
        setShowReplies(!showReplies);
    }
    const handleDelete = () => {
        Axios.delete("/api/posts/" + id)
            .then(res => {
                alert("Post Deleted");
                console.log(res);
            }).catch(err => {
                console.log(err);
                alert("error deleting post");
            });
    }

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
    }
    function updateReplyCount() {
        let replyNum = stateReplyCount;
        replyNum += 1;
        setStateReplyCount(replyNum);
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


    
    let replyComponents = replies.length > 0 ? replies.map(reply => 
        <li key={`${reply.id}:${reply.PostId}`}>
            <Card className={classes.replyCard}>
                <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center">
                    <Grid item xs={4} sm={4}>
                        <img src={reply.imageName} alt={reply.handle} className="replyAvatar"/>
                    </Grid>
                    <Grid item xs={8} sm={8}>
                        <Typography className={classes.typography} variant="h6">
                            <strong>{reply.handle}</strong>
                        </Typography>
                        <Typography className={classes.typography} variant="body1">
                            <strong>{reply.body}</strong>
                        </Typography>
                        <Typography className={classes.typography} variant="body2" color="textSecondary">
                            <strong>{new Date(reply.createdAt).getMonth() + "-" + new Date(reply.createdAt).getDate() + "-" + new Date(reply.createdAt).getFullYear()}</strong>
                        </Typography>
                    </Grid>
                </Grid>    
            </Card>
        </li> 
    ) : null;

    return (
        <li key={id}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    You've already liked this post
                </Alert>
            </Snackbar>
            <Card className={classes.card} raised>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    {otherUser ? 
                    <Avatar alt={image} src={"../" + image} className={classes.avatar} key={image}/>
                    :
                    <Avatar alt={image} src={image} className={classes.avatar} key={image}/>}
                </Grid>

                <Grid
                    container
                    direction="column"
                    justify="space-around"
                    alignItems="stretch"
                >
                    <CardContent className={classes.content}>
                        <Link to={"/user/" + handle} className={classes.typography}>
                            <Typography variant="h5" color="textPrimary">
                                <strong id="one-point-one-rem">{handle}</strong>
                            </Typography>
                        </Link>
                        <Typography className={classes.typography} variant="body1">
                            <strong>{body}</strong>
                        </Typography>
                        <Typography className={classes.typography} variant="body2" color="textSecondary">
                            <strong>{when}</strong>
                        </Typography>
                        {replies.length > 0 ? 
                            <Button type="button" onClick={handleShowReplies} color="primary">
                                {showReplies ? 'Hide Replies' : "Show Replies"}
                            </Button>
                        :
                            null
                        }
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
                        <Button type="submit" className={classes.button + " lock"} color="primary" key={id}>
                            <h2>
                                {stateLikeCount}
                            </h2>
                            
                            <FavoriteIcon color="primary" className="icon-lock"/>
                            <FavoriteBorderIcon color="primary" className="icon-unlock"/>
                        </Button>
                    </form>
                    <TransitionComment 
                        currentUser={currentUser} 
                        postId={id} 
                        parentReplyHandler={updateReplyCount} 
                        replyCount={stateReplyCount} 
                        replies={replies}
                        imageName={imageName}
                    />
                </Grid>
            </Card>
            {showReplies ? (
                <Portal container={container.current}>
                    <ul className={classes.ul}>
                        {replyComponents}
                    </ul>
                </Portal>
            ) : null}
            <div className={classes.alert} ref={container} />
        </li>
    )
}

export default withStyles(styles)(Post);

