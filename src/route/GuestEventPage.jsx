import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Avatar,
    Button,
    FormControl,
    FormGroup,
    Grid,
    IconButton,
    Paper,
    Typography,
} from "@material-ui/core";
import { Add as AddIcon, Remove as RemoveIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { green } from "@material-ui/core/colors";
import { deepOrange } from "@material-ui/core/colors";

function trimText(text) {
    if (!text || !text.length) {
        return "";
    } else if (text.length > 10) {
        return text.substring(0, 10) + "...";
    } else {
        return text;
    }
}
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
}));

const EventPage = ({ currentUser }) => {
    const { id } = useParams();
    const classes = useStyles();
    const [event, setEvent] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState({});
    const [productsExceedingQuantity, setProductsExceedingQuantity] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                console.log("fetchEvent");
                const response = await axios.get(`http://localhost:3000/event/${id}`);
                console.log("response", response);
                setEvent(response.data);
            } catch (error) {
                console.error(error);
                setError("Event not found");
            }
        };
        fetchEvent();
    }, [id]);

    useEffect(() => {
        if (event) {
            const tempSelectedProducts = {};
            event.products.forEach((product) => {
                tempSelectedProducts[product._id] = 0;
            });
            setSelectedProducts(tempSelectedProducts);
        }
    }, [event]);

    useEffect(() => {
        const tempProductsExceedingQuantity = [];
        event?.products?.forEach((product) => {
            const selectedQuantity = selectedProducts[product._id] || 0;
            if (
                selectedQuantity > 0 &&
                selectedQuantity + product.quantity > event.numberOfGuests
            ) {
                tempProductsExceedingQuantity.push(product.id);
            }
        });
        setProductsExceedingQuantity(tempProductsExceedingQuantity);
    }, [event, selectedProducts]);

    const isMaxQuantityReached = (productId, quantity) => {
        const product = event.products.find((product) => product._id === productId);
        const selectedQuantity = selectedProducts[productId] || 0;
        return selectedQuantity + quantity > product.quantity;
    };

    const canConfirm = () => {
        const totalSelected = Object.values(selectedProducts).reduce(
            (total, quantity) => total + quantity,
            0
        );

        return (
            // totalSelected >= event.numberOfGuests && productsExceedingQuantity.length === 0
            true
        );
    };
    console.log(selectedProducts);
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

    const handleSubmit = async () => {

        try {
            const existingAttendeeIndex = event.attendees.findIndex((attendee) => attendee._id === currentUser.id);
            const updatedAttendees = [...event.attendees];

            if (existingAttendeeIndex !== -1) {
                // Update existing attendee's products array
                updatedAttendees[existingAttendeeIndex].products = Object.keys(selectedProducts).map((productId) => ({
                    productId,
                    quantity: selectedProducts[productId],
                }));
            } else {
                // Add new attendee with selected products array
                updatedAttendees.push({
                    _id: currentUser.id,
                    name: currentUser.username,
                    products: Object.keys(selectedProducts).map((productId) => ({
                        productId,
                        quantity: selectedProducts[productId],
                    })),
                });
            }

            const updatedEvent = {
                ...event,
                attendees: updatedAttendees,
            };

            await axios.put(`http://localhost:3000/event/${id}`, updatedEvent);
            alert("event updated");
        } catch (error) {
            console.error(error);
            alert("An error occurred");
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
                        {event.products.map((product) => (
                            <div key={product._id} className={classes.product}>
                                <Typography variant="subtitle1" gutterBottom>
                                    {product.name} - {trimText(product.description, 30)}
                                </Typography>
                                <div>
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
                                </div>
                            </div>
                        ))}
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