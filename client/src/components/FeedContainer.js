import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box, Grid } from '@material-ui/core';
import './FeedContainer.css';

export default function FeedContainer( {children} ) {

    return (
        <div className="list-overflow-container">
            <ul className="list-group">{children}</ul>
        </div>
    );
}