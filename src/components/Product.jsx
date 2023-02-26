import React from "react";

const Product = ({ product, onSelect, checked, disabled }) => {
    const { name, price, quantity } = product;

    const handleChange = () => {
        if (onSelect) {
            onSelect(product);
        }
    };

    return (
        <div className="product-item">
            <input
                type="checkbox"
                onChange={handleChange}
                checked={checked}
                disabled={disabled}
            />
            <span className="product-name">{name}</span>
            <span className="product-quantity">Qty: {quantity}</span>
            <span className="product-price">${price}</span>
        </div>
    );
};

export default Product;
