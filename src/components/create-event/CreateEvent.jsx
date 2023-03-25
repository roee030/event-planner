import React, { useState } from 'react';

import { Stepper, Step, StepLabel, Button, Typography } from '@material-ui/core';
import ProductList from './stepper/ProductList';
import AddProductForm from './stepper/AddProductForm';
import EventSummary from './stepper/EventSummary';
import EventDetailsForm from './stepper/EventDetailsForm';
import EventConfirmation from './stepper/EventConfirmation';
import axios from 'axios';

function CreateEvent() {
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [eventId, setEventId] = useState('');
    const [isError, setIsError] = useState(false);
    const [state, setState] = useState({
        title: '',
        location: '',
        date: '',
        numberOfGuests: 0,
        products: []
    });



    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    const handleCreateEvent = async (eventData) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/event', eventData);
            setEventId(response.data._id);
            setLoading(false);
        } catch (err) {
            setIsError(true);
            setLoading(false);
        }
    };
    const handleEventDetailsSubmit = async () => {
        console.log(state);
        await handleCreateEvent(state);
        setActiveStep(activeStep + 1);
    };

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


    const steps = ['Event Details', 'Products', 'Event Summary', 'Event Confirmation'];

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
                        onBackClick={handleBack}
                        onSubmit={handleEventDetailsSubmit}
                    />

                );
            case 3:
                return (
                    <EventConfirmation loading={loading} eventId={eventId} />
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

