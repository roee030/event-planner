import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, List, ListItem, Checkbox, ListItemText } from '@material-ui/core';

function ProductSelector(props) {
    const { open, onClose, products, onProductSelect, onProductAdd } = props;
    const [newProduct, setNewProduct] = useState('');

    const handleProductAdd = () => {
        console.log("handleProductAdd - ProductSelector");
        onProductAdd(newProduct);
        setNewProduct('');
    };

    const handleProductSelect = (event, product) => {
        onProductSelect(product);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Select Products</DialogTitle>
            <DialogContent>
                <List>
                    {products.map((product, index) => (
                        <ListItem key={index} button onClick={(event) => handleProductSelect(event, product)}>
                            <Checkbox checked={product.selected} />
                            <ListItemText primary={product.name} />
                        </ListItem>
                    ))}
                </List>
                <TextField label="New Product" value={newProduct} onChange={(event) => setNewProduct(event.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleProductAdd}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ProductSelector;
