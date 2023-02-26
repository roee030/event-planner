import React, { useState } from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Checkbox,
    IconButton,
    Grid,
    Typography,
    Button,
} from '@material-ui/core';
import { CheckCircleOutline, RadioButtonUnchecked, StarHalf } from '@material-ui/icons';

const GuestEventView = ({ event }) => {
    const [checkedItems, setCheckedItems] = useState([]);

    const handleToggle = (product) => () => {
        const currentIndex = checkedItems.indexOf(product);
        const newCheckedItems = [...checkedItems];

        if (currentIndex === -1) {
            newCheckedItems.push(product);
        } else {
            newCheckedItems.splice(currentIndex, 1);
        }

        setCheckedItems(newCheckedItems);
    };

    const handleAcceptHalf = (product) => () => {
        const newCheckedItems = [...checkedItems, { ...product, quantity: product.quantity / 2 }];
        setCheckedItems(newCheckedItems);
    };

    const handleConfirm = () => {
        // handle the confirm action here
        console.log(checkedItems);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5">{event.name}</Typography>
                <Typography variant="subtitle1">{event.date}</Typography>
                <Typography variant="subtitle1">{event.location}</Typography>
            </Grid>
            <Grid item xs={12}>
                <List>
                    {event.products.map((product) => (
                        <ListItem key={product.id} button onClick={handleToggle(product)}>
                            <ListItemIcon>
                                {checkedItems.indexOf(product) !== -1 ? (
                                    <CheckCircleOutline color="primary" />
                                ) : (
                                    <RadioButtonUnchecked color="primary" />
                                )}
                            </ListItemIcon>
                            <ListItemText
                                primary={`${product.name} (${product.quantity} ${product.unit})`}
                                secondary={product.description}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" onClick={handleAcceptHalf(product)}>
                                    <StarHalf />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">
                    Please confirm that you are bringing the items above:
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {checkedItems.length > 0 ? (
                    <Typography variant="subtitle1" color="primary">
                        You are bringing the following items:
                    </Typography>
                ) : (
                    <Typography variant="subtitle1" color="error">
                        You haven't selected any items yet.
                    </Typography>
                )}
                <List>
                    {checkedItems.map((product) => (
                        <ListItem key={product.id}>
                            <ListItemText
                                primary={`${product.name} (${product.quantity} ${product.unit})`}
                                secondary={product.description}
                            />
                        </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleConfirm}>
                    Confirm
                </Button>
            </Grid>
        </Grid>
    );
};

export default GuestEventView;
