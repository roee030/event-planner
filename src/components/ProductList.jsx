import React from 'react';

function ProductList({ products = [], onAddProduct, onRemoveProduct }) {
    const handleAddProduct = () => {
        onAddProduct();
    };

    const handleRemoveProduct = (index) => {
        onRemoveProduct(index);
    };

    return (
        <div>
            <h2>Product List</h2>
            <button onClick={handleAddProduct}>Add Product</button>
            {products.map((product, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={product}
                        onChange={(e) =>
                            onRemoveProduct
                                ? onRemoveProduct(index, e.target.value)
                                : null
                        }
                    />
                    {onRemoveProduct && (
                        <button onClick={() => handleRemoveProduct(index)}>
                            Remove Product
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ProductList;
