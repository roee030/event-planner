import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Grid,
    Box
} from '@material-ui/core';
import EventCard from '../components/EventCard';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    title: {
        marginBottom: theme.spacing(2),
    },
    center: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

const EventsPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:3000/event');
                const data = await response.json();
                const sortedEvents = data.sort((a, b) => {
                    return new Date(a.date) - new Date(b.date);
                });
                setEvents(sortedEvents);
            } catch (error) {
                console.error(error);
            }
        };
        fetchEvents();
    }, []);

    const handleEventClick = (eventId) => {
        history.push(`/event/${eventId}`);
    };

    const upcomingEvents = events.filter((event) => new Date(event.date) > new Date());
    const pastEvents = events.filter((event) => new Date(event.date) <= new Date());

    return (
        <div className={classes.root}>
            <Typography variant="h3" className={classes.title}>
                My Events
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4" className={classes.title}>
                        Upcoming Events
                    </Typography>
                    {upcomingEvents.length > 0 ? (
                        <Box className={classes.center}>
                            {upcomingEvents.map((event) => (
                                <EventCard
                                    key={event._id}
                                    title={event.title}
                                    date={event.date}
                                    location={event.location}
                                    onClick={() => handleEventClick(event._id)}
                                />
                            ))}
                        </Box>
                    ) : (
                        <Typography variant="subtitle1">No upcoming events.</Typography>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4" className={classes.title}>
                        Past Events
                    </Typography>
                    {pastEvents.length > 0 ? (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Location</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pastEvents.map((event) => (
                                        <TableRow key={event._id} hover onClick={() => handleEventClick(event._id)}>
                                            <TableCell component="th" scope="row">
                                                {event.title}
                                            </TableCell>
                                            <TableCell>{new Date(event.date).toLocaleString()}</TableCell>
                                            <TableCell>{event.location}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>) : (
                        <Typography variant="subtitle1">No past events.</Typography>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default EventsPage;