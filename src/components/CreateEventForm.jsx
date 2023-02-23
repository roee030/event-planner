import React, { useState } from 'react';

function CreateEventForm() {
    const [groceries, setGroceries] = useState([]);
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        // Create a new object with the entered product and price
        const newGrocery = { product, price };
        // Add the new object to the groceries state array
        setGroceries([...groceries, newGrocery]);
        // Reset the form inputs
        setProduct('');
        setPrice('');
    };

    const handleProductChange = event => {
        setProduct(event.target.value);
    };

    const handlePriceChange = event => {
        setPrice(event.target.value);
    };

    // Array of common groceries
    const commonGroceries = [
        'Water',
        'Soda',
        'Juice',
        'Chips',
        'Pretzels',
        'Cookies',
        'Paper plates',
        'Plastic cups',
        'Napkins',
        'Beer',
        'Wine',
        'Vodka',
        'Whiskey'
    ];

    return (
        <div>
            <h2>Create Event Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="product">Product:</label>
                    <select id="product" value={product} onChange={handleProductChange}>
                        <option value="">Select a product</option>
                        {commonGroceries.map(grocery => (
                            <option key={grocery} value={grocery}>
                                {grocery}
                            </option>
                        ))}
                        {groceries.map((grocery, index) => (
                            <option key={index} value={grocery.product} disabled>
                                {grocery.product}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        id="price"
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={price}
                        onChange={handlePriceChange}
                    />
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default CreateEventForm;
