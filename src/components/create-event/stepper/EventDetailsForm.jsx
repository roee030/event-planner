import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "25ch",
        },
        "& .MuiButton-root": {
            margin: theme.spacing(2),
        },
    },
}));

const EventDetailsForm = ({ state, setState, handleNextStep }) => {
    const classes = useStyles();

    const handleEventDetailsSubmit = (e) => {
        e.preventDefault();
        handleNextStep();
    };

    return (
        <form onSubmit={handleEventDetailsSubmit} className={classes.form}>
            <TextField
                id="eventName"
                label="Event Name"
                variant="outlined"
                value={state.eventName}
                onChange={(event) =>
                    setState((prevState) => ({ ...prevState, eventName: event.target.value }))
                }
            />
            <TextField
                id="eventLocation"
                label="Event Location"
                variant="outlined"
                value={state.eventLocation}
                onChange={(event) =>
                    setState((prevState) => ({ ...prevState, eventLocation: event.target.value }))
                }
            />
            <TextField
                id="eventDate"
                label="Date"
                type="date"
                variant="outlined"
                value={state.eventDate}
                onChange={(event) =>
                    setState((prevState) => ({ ...prevState, eventDate: event.target.value }))
                }
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="eventTime"
                label="Time"
                type="time"
                variant="outlined"
                value={state.eventTime}
                onChange={(event) =>
                    setState((prevState) => ({ ...prevState, eventTime: event.target.value }))
                }
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
            />
            <TextField
                id="guestNumber"
                label="Number of Guests"
                type="number"
                variant="outlined"
                value={state.guestNumber}
                onChange={(event) =>
                    setState((prevState) => ({ ...prevState, guestNumber: event.target.value }))
                }
            />
            <Button type="submit" variant="contained" color="primary">
                Next
            </Button>
        </form>
    );
};

export default EventDetailsForm;
