import React, { useState } from 'react';

import { Stepper, Step, StepLabel, Button, Typography } from '@material-ui/core';
import ProductList from './ProductList';
import AddProductForm from './AddProductForm';
import EventSummary from './EventSummary';
import EventDetailsForm from './EventDetailsForm';

function CreateEvent() {
    const [activeStep, setActiveStep] = useState(0);
    const [state, setState] = useState({
        eventName: '',
        eventLocation: '',
        eventDate: '',
        eventTime: '',
        guestNumber: 0,
        products: []
    });

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    // const handleEventDetailsSubmit = (event) => {
    //     event.preventDefault();
    //     handleNext();
    // };

    const handleProductAdd = (newProduct) => {
        const productIndex = state.products.findIndex(
            (product) => product.id === newProduct.id
        );
        if (productIndex !== -1) {
            const newProducts = [...state.products];
            newProducts[productIndex].quantity += 1;
            setState((prevState) => ({
                ...prevState,
                products: newProducts,
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                products: [...state.products, { ...newProduct, quantity: 1 }],
            }));
        }
    };


    const steps = ['Event Details', 'Products', 'Event Summary'];

    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return <EventDetailsForm state={state} setState={setState} handleNextStep={handleNext} />;

            case 1:
                return (
                    <div>
                        <AddProductForm onProductAdd={handleProductAdd} />
                        <Typography variant="body1">Add Products</Typography>
                        <ProductList
                            state={state}
                            setState={setState}
                        />

                        <div>
                            <Button variant="contained" color="primary" onClick={handleBack}>Back</Button>
                            <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <EventSummary
                        state={state}
                        onBackClick={handleBack} />
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

