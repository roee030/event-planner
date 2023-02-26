import React, { useState, useEffect } from "react";
import {
    Paper,
    Typography,
    FormControl,
    FormGroup,
    Button,
    Grid,
    IconButton,
} from "@material-ui/core";
import { Add as AddIcon, Remove as RemoveIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

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
}));

const GuestEventPage = ({ event }) => {
    const classes = useStyles();
    const [selectedProducts, setSelectedProducts] = useState({});

    useEffect(() => {
        if (event) {
            const tempSelectedProducts = {};
            event.products.forEach((product) => {
                tempSelectedProducts[product.id] = 0;
            });
            setSelectedProducts(tempSelectedProducts);
        }
    }, [event]);

    const isMaxQuantityReached = (productId, quantity) => {
        const product = event.products.find((product) => product.id === productId);
        const selectedQuantity = selectedProducts[productId] || 0;
        return selectedQuantity + quantity > product.quantity;
    };


    const handleProductChange = (productId, quantity) => {
        setSelectedProducts((prevState) => ({
            ...prevState,
            [productId]: quantity,
        }));
    };

    const calculateTotalPrice = (products, selectedProducts) => {
        let totalPrice = Object.values(products).reduce((acc, product) => {
            const { price } = product;
            const selectedQuantity = selectedProducts[product.id] || 0;
            return acc + (price * selectedQuantity);
        }, 0);
        return totalPrice.toFixed(2);
    };


    const handleRSVP = () => {
        // calculate total price
        const totalPrice = calculateTotalPrice(event.products, selectedProducts);
        console.log("RSVP clicked", selectedProducts, totalPrice);
    };



    return (
        <Paper className={classes.root}>
            <Typography variant="h4" align="center" gutterBottom>
                {event.title}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">
                        Date: {event.date.toLocaleString()}
                    </Typography>
                    <Typography variant="subtitle1">
                        Location: {event.location}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" align="right">
                        Price: ${event.price}
                    </Typography>
                </Grid>
            </Grid>

            <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                    {event.products.map((product) => {
                        const { id, name, quantity } = product;
                        const selectedQuantity = selectedProducts[id] || 0;
                        const attendeeQuantities = event.attendees.map((attendee) => {
                            const attendeeProduct = attendee.products.find((p) => p.productId === id);
                            return attendeeProduct ? attendeeProduct.quantity : 0;
                        });
                        const totalAttendeeQuantity = attendeeQuantities.reduce((a, b) => a + b, 0);
                        const maxQuantity = quantity - totalAttendeeQuantity;
                        const isMaxQuantityReached = selectedQuantity >= maxQuantity;
                        const isMinQuantityReached = selectedQuantity <= 0;

                        return (
                            <Grid
                                container
                                key={id}
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1">{name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <IconButton
                                            aria-label="reduce"
                                            onClick={() => {
                                                handleProductChange(id, selectedQuantity - 1);
                                            }}
                                            disabled={isMinQuantityReached}
                                        >
                                            <RemoveIcon fontSize="small" />
                                        </IconButton>
                                        <Typography variant="body1">{selectedQuantity}</Typography>
                                        <IconButton
                                            aria-label="increase"
                                            onClick={() => {
                                                handleProductChange(id, selectedQuantity + 1);
                                            }}
                                            disabled={isMaxQuantityReached}
                                        >
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                    </div>
                                </Grid>
                                {isMaxQuantityReached && (
                                    <Grid item xs={12}>
                                        <Typography variant="caption" color="error">
                                            Not enough {name} available.
                                        </Typography>
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <Typography variant="caption">
                                        {maxQuantity} {name} available
                                    </Typography>
                                </Grid>
                            </Grid>
                        );
                    })}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" align="right">
                            Total: ${calculateTotalPrice(event.products, selectedProducts)}
                        </Typography>
                    </Grid>
                </FormGroup>
            </FormControl>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.submitBtn}
                    onClick={handleRSVP}
                >
                    RSVP
                </Button>
            </div>
        </Paper>
    );

};
export default GuestEventPage;