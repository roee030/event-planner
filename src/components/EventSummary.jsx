import React from "react";
import { Typography, Box, Button, Grid } from "@material-ui/core";

const EventSummary = ({ state, onBackClick }) => {
    console.log(state);
    return (
        <Box m={2}>
            <Typography variant="h4" component="h2" gutterBottom>
                Event Summary
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Box display="flex" flexDirection="column">
                        <Typography variant="h6" component="h3" gutterBottom>
                            Event Details
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Event Name:</strong> {state?.eventName}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Event Location:</strong> {state?.eventLocation}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Event Date:</strong> {`${state?.eventDate} - ${state?.eventTime}`}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Event Guest Number:</strong> {state?.guestNumber}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box display="flex" flexDirection="column">
                        <Typography variant="h6" component="h3" gutterBottom>
                            Event Products
                        </Typography>
                        {state?.products.map((product) => (
                            <Box key={product.id} mb={1}>
                                <Typography variant="body1">
                                    <strong>{product.name}</strong> - {product.price} NIS x {product.quantity} = {product.price * product.quantity} NIS
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Grid>
            </Grid>
            <Box mt={2}>
                <Button variant="contained" color="primary" onClick={onBackClick}>
                    Back
                </Button>
                <Button variant="contained" color="primary">
                    Create Event
                </Button>
            </Box>
        </Box>
    );
};

export default EventSummary;
