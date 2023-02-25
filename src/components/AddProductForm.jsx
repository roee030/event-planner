import React, { useState, useEffect } from 'react';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Button,
    makeStyles,
} from "@material-ui/core";
import productList from "../data/productsData.json";
const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 300,
        marginBottom: theme.spacing(2),
    },
    textField: {
        marginBottom: theme.spacing(2),
    },
}));

function AddProductForm({ onProductAdd }) {
    const classes = useStyles();

    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [selectedProductId, setSelectedProductId] = useState("");
    const [isCustomProduct, setIsCustomProduct] = useState(false);

    const handleSelectChange = (event) => {
        setSelectedProductId(event.target.value);
        setIsCustomProduct(event.target.value === "addCustomProduct");
    };

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    };

    const handleProductPriceChange = (event) => {
        setProductPrice(event.target.value);
    };

    useEffect(() => {
        setSelectedProductId("");
        setProductName("");
        setProductPrice("");
        setIsCustomProduct(false);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isCustomProduct) {
            onProductAdd({
                id: null,
                name: productName,
                price: productPrice,
                quantity: 1,
            });
        } else {
            const selectedProduct = productList.find((product) => product.id === selectedProductId);
            onProductAdd({
                ...selectedProduct,
                quantity: 1,
            });
        }

        setSelectedProductId("");
        setProductName("");
        setProductPrice("");
        setIsCustomProduct(false);
    };
    return (
        <form onSubmit={handleSubmit}>
            <FormControl className={classes.formControl}>
                <InputLabel id="product-select-label">Product</InputLabel>
                <Select
                    labelId="product-select-label"
                    id="product-select"
                    value={selectedProductId}
                    onChange={handleSelectChange}
                    style={{ minWidth: "300px" }}
                >
                    <MenuItem value="">Select a product</MenuItem>
                    <MenuItem value="addCustomProduct">Add custom product</MenuItem>
                    {productList.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                            {product.name} - {product.price} NIS
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {isCustomProduct && (
                <>
                    <TextField
                        label="Product Name"
                        value={productName}
                        onChange={handleProductNameChange}
                        margin="normal"
                        className={classes.textField}
                    />
                    <TextField
                        label="Price"
                        type="number"
                        value={productPrice}
                        onChange={handleProductPriceChange}
                        margin="normal"
                        className={classes.textField}
                    />
                </>
            )}
            <Button variant="contained" color="primary" type="submit">
                Add
            </Button>
        </form>
    );
};

export default AddProductForm;
