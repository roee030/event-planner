import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Stepper, Step, StepLabel, Button } from '@material-ui/core';
import ProductList from './ProductList';
import AddProductForm from './AddProductForm';

function CreateEvent() {
    const [activeStep, setActiveStep] = useState(0);
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [guestNumber, setGuestNumber] = useState(0);
    const [products, setProducts] = useState([]);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleEventDetailsSubmit = (event) => {
        event.preventDefault();
        handleNext();
    };

    const handleProductAdd = (newProduct) => {
        const productIndex = products.findIndex((product) => product.id === newProduct.id);
        if (productIndex !== -1) {
            const newProducts = [...products];
            newProducts[productIndex].quantity += 1;
            setProducts(newProducts);
        } else {
            setProducts([...products, { ...newProduct, quantity: 1 }]);
        }
    };




    const handleProductDelete = (product) => {
        const productIndex = products.findIndex((p) => p.id === product.id);
        if (productIndex !== -1) {
            const newProducts = [...products];
            if (newProducts[productIndex].quantity > 1) {
                newProducts[productIndex].quantity -= 1;
                setProducts(newProducts);
            } else {
                newProducts.splice(productIndex, 1);
                setProducts(newProducts);
            }
        }
    };

    const steps = ['Event Details', 'Products'];

    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return (
                    <form onSubmit={handleEventDetailsSubmit}>
                        <div>
                            <label htmlFor="eventName">Event Name:</label>
                            <input
                                id="eventName"
                                type="text"
                                value={eventName}
                                onChange={(event) => setEventName(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="eventDate">Date:</label>
                            <input
                                id="eventDate"
                                type="date"
                                value={eventDate}
                                onChange={(event) => setEventDate(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="eventTime">Time:</label>
                            <input
                                id="eventTime"
                                type="time"
                                value={eventTime}
                                onChange={(event) => setEventTime(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="guestNumber">Number of Guests:</label>
                            <input
                                id="guestNumber"
                                type="number"
                                value={guestNumber}
                                onChange={(event) => setGuestNumber(event.target.value)}
                            />
                        </div>
                        <button type="submit">Next</button>
                    </form>
                );
            case 1:
                return (
                    <div>
                        <h2>Add Products</h2>
                        <ProductList
                            products={products}
                            onProductAdd={handleProductAdd}
                            setProducts={setProducts}
                            onRemoveProduct={handleProductDelete} />
                        <AddProductForm
                            onProductAdd={handleProductAdd}
                        />
                        <div>
                            <Button onClick={handleBack}>Back</Button>
                            <Button onClick={handleNext}>Finish</Button>
                        </div>
                    </div>
                );
            default:
                return 'Unknown stepIndex';
        }
    };

    return (
        <div>
            <h1>Create New Event</h1>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>{getStepContent(activeStep)}</div>
        </div>
    );
}

export default CreateEvent;

