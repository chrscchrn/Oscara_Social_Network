import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, Grid, TextField } from '@material-ui/core';

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

    export default function TransitionsModal() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
        <Button type="button" color="primary" onClick={handleOpen}>
            Reply
        </Button>
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
                    <h2 id="transition-modal-title">Reply to User's Status</h2>
                    <TextField 
                        className={classes.textfield}
                        multiline 
                        // onChange={handleInputChange} 
                        name="body" 
                        id="filled-basic" 
                        label="What would you like to say?" 
                        variant="filled"
                        rows={4}
                    />
                </Grid>
                <Button type="button" color="primary">
                    Reply
                </Button>
            </div>
            </Fade>
        </Modal>
        </div>
    );
}