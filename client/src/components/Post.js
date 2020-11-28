import React from 'react';
import { Link } from 'react-router-dom';
// import ViewComments from './viewComments';
import TransitionComment from './TransitionComment';
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
                console.log(res);
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
                alert(res.data.error);
                return;
            }
            let likes = stateLikeCount;
            likes += 1;
            setStateLikeCount(likes);
        }).catch(err => {
            console.log("error: ", err);
            alert("other error", err);
        });
        setLiked(true);
    }

    function updateReplyCount() {
        let replies = stateReplyCount;
        replies += 1;
        console.log('working')
        setStateReplyCount(replies);
    }

    return (
        <Card className={classes.card} raised>
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
                    {/* <Typography className={classes.typography} variant="body2" color="textSecondary">
                        <FavoriteBorderIcon color="primary"/>
                        {stateLikeCount} Likes
                    </Typography> */}
                    {/* IF REPLY COUNT IS GREATER THAN 0 DO A GET REQUEST */}
                    {/* <ViewComments replyCount={stateReplyCount} /> */}
                </CardContent>
            </Grid>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >   
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

