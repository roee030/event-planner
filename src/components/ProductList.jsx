import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@material-ui/core';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';

function ProductList({ products = [], onRemoveProduct, onProductAdd }) {

    const handleRemoveProduct = (id) => {
        onRemoveProduct(id);
    };

    const handleAddProduct = (id) => {
        console.log("handleAddProduct - ProductList");
        const productIndex = products.findIndex((product) => product.id === id);
        if (productIndex !== -1) {
            const newProducts = [...products];
            newProducts[productIndex].quantity += 1;
            onProductAdd(newProducts);
        }
    };

    return (
        <>
            <Typography variant="h6">Products</Typography>
            <List>
                {products.map((product, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
                        <ListItemSecondaryAction>
                            <IconButton aria-label="Add" onClick={() => handleAddProduct(product.id)}>
                                <AddCircleOutline />
                            </IconButton>
                            {product.quantity > 1 ? (
                                <IconButton aria-label="Remove" onClick={() => handleRemoveProduct(product.id)}>
                                    <RemoveCircleOutline />
                                </IconButton>
                            ) : (
                                <IconButton aria-label="Remove" onClick={() => handleRemoveProduct(product.id)} disabled>
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
