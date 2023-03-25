import React from 'react';
import { Box, Typography, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FileCopy as FileCopyIcon, WhatsApp as WhatsAppIcon, Facebook as FacebookIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    box: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing(2),
    },
    button: {
        marginRight: theme.spacing(1),
    },
}));

function EventConfirmation({ eventId, loading, isError }) {
    const classes = useStyles();
    const eventLink = `${window.location.origin}/event/${eventId}`;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(eventLink);
    };

    const handleShareWhatsapp = () => {
        const whatsappLink = `whatsapp://send?text=${eventLink}`;
        window.location.href = whatsappLink;
    };

    const handleShareFacebook = () => {
        const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventLink)}`;
        window.open(facebookLink);
    };

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
            <div className={classes.buttonContainer}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FileCopyIcon />}
                    onClick={handleCopyLink}
                    className={classes.button}
                >
                    Copy Link
                </Button>
                <IconButton
                    color="primary"
                    aria-label="Share on Whatsapp"
                    component="span"
                    onClick={handleShareWhatsapp}
                    className={classes.button}
                >
                    <WhatsAppIcon />
                </IconButton>
                <IconButton
                    color="primary"
                    aria-label="Share on Facebook"
                    component="span"
                    onClick={handleShareFacebook}
                    className={classes.button}
                >
                    <FacebookIcon />
                </IconButton>
            </div>
        </Box>
    );
}

export default EventConfirmation;
