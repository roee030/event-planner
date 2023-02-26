import React, { useState } from "react";
import Product from "./Product";
import { makeStyles } from "@material-ui/core/styles";
import {
    Paper,
    Typography,
    FormControl,
    FormGroup,
    Button,
    Grid,
    Container,
    IconButton,
    Box,
} from "@material-ui/core";
import { Add as AddIcon, Remove as RemoveIcon } from "@material-ui/icons";

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

    const handleProductChange = (productId, quantity) => {
        setSelectedProducts((prevSelectedProducts) => ({
            ...prevSelectedProducts,
            [productId]: quantity,
        }));
    };

    const handleProductIncrement = (productId) => {
        const newQuantity = (selectedProducts[productId] || 0) + 1;
        handleProductChange(productId, newQuantity);
    };

    const handleProductDecrement = (productId) => {
        const currentQuantity = selectedProducts[productId] || 0;
        if (currentQuantity > 0) {
            const newQuantity = currentQuantity - 1;
            handleProductChange(productId, newQuantity);
        }
    };

    const handleSubmit = () => {
        let totalPrice = 0;
        for (const product of event.products) {
            const selectedQuantity = selectedProducts[product.id] || 0;
            totalPrice += selectedQuantity * product.price;
        }
        const totalQuantity = Object.values(selectedProducts).reduce(
            (acc, val) => acc + val,
            0
        );

        const maxGuests = Math.floor(totalPrice / (event.price * 1.15));

        if (totalQuantity > maxGuests) {
            alert(
                "Sorry, you can't bring all the products you selected. Please remove some products or reduce the quantity."
            );
            return;
        }

        const attendees = Object.entries(selectedProducts).map(([id, quantity]) => ({
            id,
            quantity,
        }));
        alert(
            `Thank you for your RSVP! You have selected ${totalQuantity} items for a total of $${totalPrice.toFixed(
                2
            )}. We look forward to seeing you at the event!`
        );
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
                    {event.products.map((product) => (
                        <Grid container key={product.id} alignItems="center" justifyContent="space-between">
                            <Grid item xs={6}>
                                <Typography variant="subtitle1">{product.name}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton
                                        aria-label="reduce"
                                        onClick={() => {
                                            const newQuantity = selectedProducts[product.id] - 1 || 0;
                                            handleProductChange(product.id, newQuantity);
                                        }}
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </IconButton>
                                    <Typography variant="body1">{selectedProducts[product.id] || 0}</Typography>
                                    <IconButton
                                        aria-label="increase"
                                        onClick={() => {
                                            const newQuantity = (selectedProducts[product.id] || 0) + 1;
                                            handleProductChange(product.id, newQuantity);
                                        }}
                                    >
                                        <AddIcon fontSize="small" />
                                    </IconButton>
                                </div>
                            </Grid>
                        </Grid>
                    ))}
                </FormGroup>
            </FormControl>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.submitBtn}
                    onClick={handleSubmit}
                >
                    RSVP
                </Button>
            </div>
        </Paper >
    );
};

export default GuestEventPage;
