import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Button } from '@material-ui/core';


export default function DeletePost(props) {
    return (
        <div>
            <Button onClick={props.handleDelete} className="lock" color="primary" style={{ marginTop: "50px" }}>
                <DeleteOutlineIcon className="icon-unlock"/>
                <DeleteIcon className="icon-lock"/>            
            </Button>
        </div>
    )
}
