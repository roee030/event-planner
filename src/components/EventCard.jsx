import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: '0 auto',
    },
    media: {
        height: 140,
    },
});

const EventCard = ({ event }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={event.image}
                    title={event.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {event.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {event.date.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {event.location}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default EventCard;
