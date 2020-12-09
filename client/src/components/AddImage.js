import React from 'react'
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ImageHelper from "../components/ImageHelper";
import Typography from '@material-ui/core/Typography';

export default function AddImage(props) {
    return (
        <Card raised>
            <Typography variant="h5" color="textPrimary" >
                Add a Profile Picture
            </Typography>
            <ImageHelper email={props.email}/>
            <Button color="primary" onClick={props.finishSetup}>
                Done
            </Button>
        </Card>
    )
}
