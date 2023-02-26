import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@material-ui/core';
import { AddCircleOutline, RemoveCircleOutline, Cancel } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';

function ProductList({ state, setState }) {

    const handleProductAdd = (newProduct) => {
        const productIndex = state.products.findIndex((product) => product.id === newProduct.id);
        if (productIndex !== -1) {
            const newProducts = [...state.products];
            newProducts[productIndex].quantity += 1;
            setState(prevState => ({ ...prevState, products: newProducts }));
        } else {
            setState(prevState => ({ ...prevState, products: [...state.products, { ...newProduct, quantity: 1 }] }));
        }
    };

    const handleProductDelete = (product) => {
        const productIndex = state.products.findIndex((p) => p.id === product.id);
        if (productIndex !== -1) {
            const newProducts = [...state.products];
            if (newProducts[productIndex].quantity > 1) {
                newProducts[productIndex].quantity -= 1;
                setState(prevState => ({ ...prevState, products: newProducts }));
            } else {
                newProducts.splice(productIndex, 1);
                setState(prevState => ({ ...prevState, products: newProducts }));
            }
        }
    };

    const handleProductRemove = (product) => {
        const productIndex = state.products.findIndex((p) => p.id === product.id);
        if (productIndex !== -1) {
            const newProducts = [...state.products];
            newProducts.splice(productIndex, 1);
            setState(prevState => ({ ...prevState, products: newProducts }));
        }
    };

    return (
        <>
            <Typography variant="h6">Products</Typography>
            <List>
                {state.products.map((product, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
                        <ListItemSecondaryAction>
                            <IconButton aria-label="Cancel" onClick={() => handleProductRemove(product)}>
                                <Cancel />
                            </IconButton>
                            <IconButton aria-label="Add" onClick={() => handleProductAdd(product)}>
                                <AddCircleOutline />
                            </IconButton>
                            {product.quantity > 1 ? (
                                <IconButton aria-label="Remove" onClick={() => handleProductDelete(product)}>
                                    <RemoveCircleOutline />
                                </IconButton>
                            ) : (
                                <IconButton aria-label="Remove" onClick={() => handleProductDelete(product)} disabled>
                                    <RemoveCircleOutline />
                                </IconButton>
                            )}
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </>
    );
}

export default ProductList;
