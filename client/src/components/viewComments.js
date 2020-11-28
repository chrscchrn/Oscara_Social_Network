import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, Grid, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        outline: 0,
    },
    paper: {
        color: "black",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: 6,
        width: "40%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 0,
    },
    textfield: {
        width: "80%"
    }
}));

export default function viewComments(props) {

    const classes = useStyles();
    const [ open, setOpen ] = React.useState(false);
    const [ replies, setReplies ] = React.useState([]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { replyCount } = props;

    React.useEffect(() => {
        setReplies(props.replies);
    }, [props.replies])

    return (
        <div>
            <Typography className={classes.typography} onClick={handleOpen} variant="body2" color="textSecondary">
                {replyCount} Replies
            </Typography>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <Grid
                            container
                            direction="column"
                            justify="space-evenly"
                            alignItems="center"
                        >
                            <h2 id="transition-modal-title">Replies for X's Status</h2>
                        {/* {replies}     */}
                        {replies.map(reply => <><h1>{reply.handle}</h1><p>{reply.body}</p><p>{reply.createdAt}</p><br/></>)}
                        </Grid>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}