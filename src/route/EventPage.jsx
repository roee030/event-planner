import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Avatar,
    Button,
    Box,
    FormGroup,
    Grid,
    IconButton,
    Paper,
    Typography,
    Tooltip
} from "@material-ui/core";
import { Add as AddIcon, Remove as RemoveIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { blue, green, orange, purple, red } from "@material-ui/core/colors";
import { deepOrange } from "@material-ui/core/colors";
import { useHistory } from 'react-router-dom';

function trimText(text) {
    if (!text || !text.length) {
        return "";
    } else if (text.length > 10) {
        return text.substring(0, 10) + "...";
    } else {
        return text;
    }
}
const getRandomColor = () => {
    const colors = [red[500], blue[500], green[500], purple[500], orange[500]];
    return colors[Math.floor(Math.random() * colors.length)];
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
        marginTop: theme.spacing(4),
        maxWidth: 600,
        margin: "0 auto",
    },
    formControl: {
        marginBottom: theme.spacing(3),
    },
    submitBtn: {
        marginTop: theme.spacing(3),
        alignSelf: "center",
    },
    product: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: theme.spacing(2),
    },
    errorPage: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: theme.palette.background.default,
    },
    avatar: {
        height: theme.spacing(1.5),
        width: theme.spacing(1.5),
        fontSize: theme.typography.caption.fontSize,
        marginRight: theme.spacing(0.5),
    },
}));

const EventPage = ({ currentUser }) => {
    const { id } = useParams();
    const classes = useStyles();
    const history = useHistory();
    const [event, setEvent] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState({});
    const [error, setError] = useState(null);

    // fetch the event data
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/event/${id}`);
                setEvent(response.data);
            } catch (error) {
                setError("Event not found");
            }
        };
        fetchEvent();
    }, [id]);

    // update the user selected products
    useEffect(() => {
        if (event) {
            const tempSelectedProducts = {};
            event.products.forEach((product) => {
                tempSelectedProducts[product._id] = 0;
            });

            // Check if user is in attendees list
            const userAttendee = event.attendees.find(attendee => attendee._id === currentUser._id);
            if (userAttendee) {
                console.log(tempSelectedProducts);

                // If user is already in attendees list, update the quantity for selected products
                userAttendee.products
                    .forEach(product => {
                        console.log("productId", product);
                        tempSelectedProducts[`${product.productId}`] = product.quantity;

                    });
            }
            setSelectedProducts(tempSelectedProducts);
        }
    }, [event, currentUser]);


    const isMaxQuantityReached = (productId, quantity) => {
        const product = event.products.find((product) => product._id === productId);
        const selectedQuantity = selectedProducts[productId] || 0;
        const productSelectedCount = event.attendees.reduce(
            (count, attendee) =>
                count +
                (attendee.products.find(
                    (product) => product.productId === productId
                )?.quantity || 0),
            0
        );
        return selectedQuantity + productSelectedCount + quantity > product.quantity;
    };


    const handleProductChange = (productId, quantity) => {
        setSelectedProducts((prevState) => ({
            ...prevState,
            [productId]: quantity,
        }));
    };

    const calculateTotal = () => {
        let total = 0;
        event?.products?.forEach((product) => {
            const selectedQuantity = selectedProducts[product._id] || 0;
            total += selectedQuantity * product.price;
        });
        return total;
    };

    const canConfirm = () => {
        const totalPrice = calculateTotal();
        const totalProductPrice = event.products.reduce((total, product) => { return total + product.price * product.quantity; }, 0);
        const pricePerUser = totalProductPrice / event.numberOfGuests;
        return (totalPrice >= pricePerUser);
    };

    const handleSubmit = async () => {
        try {
            const existingAttendeeIndex = event.attendees.findIndex(
                attendee => attendee._id === currentUser.id
            );
            const updatedAttendees = [...event.attendees];

            if (existingAttendeeIndex !== -1) {
                // Update existing attendee's products array
                updatedAttendees[existingAttendeeIndex].products = Object.keys(
                    selectedProducts
                ).map(productId => ({
                    productId,
                    quantity: selectedProducts[productId]
                }));
            } else {
                // Add new attendee with selected products array
                updatedAttendees.push({
                    _id: currentUser.id,
                    name: currentUser.username,
                    products: Object.keys(selectedProducts).map(productId => ({
                        productId,
                        quantity: selectedProducts[productId]
                    }))
                });
            }

            const updatedEvent = {
                ...event,
                attendees: updatedAttendees
            };

            // Make a PUT request to update the event
            await axios.put(`http://localhost:3000/event/${id}`, updatedEvent);

            // Make a PUT request to add the event to the user's event list
            await axios.put(
                `http://localhost:3000/user/${currentUser._id}/event/${event._id}`
            );
            history.push('/events');
        } catch (error) {
            console.error(error);
            alert('An error occurred while adding the event to your list.');
        }
    };



    if (error) {
        return (
            <div className={classes.errorPage}>
                <Typography variant="h4" gutterBottom>
                    {error}
                </Typography>
                <Button variant="contained" color="primary" href="/">
                    Go to homepage
                </Button>
            </div>
        );
    }

    return (
        <>
            {event && (
                <Paper className={classes.root}>
                    <Typography variant="h4" gutterBottom>
                        {event.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Guest count: {event.numberOfGuests}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Budget: ${event.budget}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Available products:
                    </Typography>
                    <FormGroup className={classes.formControl}>
                        {event.products.map((product) => {
                            const attendeesWithProduct = event.attendees.filter((attendee) => {
                                return attendee.products.find((attendeeProduct) => {
                                    return attendeeProduct.productId === product._id;
                                });
                            });

                            return (
                                <div key={product._id} className={classes.product}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        {product.name} - {trimText(product.description, 30)}
                                    </Typography>
                                    <Box display="flex" alignItems="center">
                                        {attendeesWithProduct.map((attendee) => {
                                            const attendeeProduct = attendee.products.find((attendeeProduct) => {
                                                return attendeeProduct.productId === product._id;
                                            });
                                            if (attendeeProduct.quantity > 0) {
                                                return (
                                                    <Tooltip
                                                        key={attendee._id}
                                                        title={`${attendee.name} - ${attendeeProduct.quantity} ${attendeeProduct.quantity === 1 ? 'product' : 'products'
                                                            }`}
                                                    >
                                                        <Avatar
                                                            className={classes.avatar}
                                                            style={{ backgroundColor: getRandomColor() }}
                                                        >
                                                            {attendee.name?.charAt(0)}
                                                        </Avatar>
                                                    </Tooltip>
                                                );
                                            }

                                        })}
                                        <Box display="flex" alignItems="center">
                                            <IconButton
                                                aria-label="remove"
                                                disabled={selectedProducts[product._id] === 0}
                                                onClick={() =>
                                                    handleProductChange(
                                                        product._id,
                                                        selectedProducts[product._id] - 1
                                                    )
                                                }
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                            <Avatar
                                                style={{
                                                    backgroundColor: isMaxQuantityReached(
                                                        product._id,
                                                        1
                                                    )
                                                        ? deepOrange[500]
                                                        : green[500],
                                                }}
                                            >
                                                {selectedProducts[product._id] || 0}
                                            </Avatar>
                                            <IconButton
                                                aria-label="add"
                                                disabled={isMaxQuantityReached(product._id, 1)}
                                                onClick={() =>
                                                    handleProductChange(
                                                        product._id,
                                                        selectedProducts[product._id] + 1
                                                    )
                                                }
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </div>
                            );
                        })}



                    </FormGroup>
                    <Grid container justifyContent="flex-end">
                        <Grid item xs={4}>
                            <Typography variant="h6" gutterBottom>
                                Total: ${calculateTotal()}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.submitBtn}
                                disabled={!canConfirm()}
                                onClick={handleSubmit}
                            >
                                Confirm
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </>
    );
};

export default EventPage;