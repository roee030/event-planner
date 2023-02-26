import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    box: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
}));

function EventConfirmation() {
    const classes = useStyles();

    return (
        <Box className={classes.box}>
            <Typography variant="h4">Congratulations!</Typography>
            <Typography variant="subtitle1">
                Your event has been created successfully.
            </Typography>
            <Typography variant="body1">
                The next step is to send the invite link to your friends to confirm
                their attendance.
            </Typography>
        </Box>
    );
}

export default EventConfirmation;
