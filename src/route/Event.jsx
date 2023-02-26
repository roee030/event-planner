import React from 'react';
import GuestEventPage from '../components/GuestEventPage';

const Event = () => {
    const event = {
        id: 1,
        title: "My Party",
        date: new Date("2023-03-01T12:00:00"),
        location: "123 Main St, Anytown, USA",
        price: 5,
        products: [
            { id: 1, name: "Chips", price: 5 },
            { id: 2, name: "Soda", price: 5 },
            { id: 3, name: "Pizza", price: 10 },
            { id: 4, name: "Beer", price: 3 },
        ],
        attendees: [
            { id: 1, name: "John", products: { 1: 2, 3: 1 } },
            { id: 2, name: "Bob", products: { 1: 1, 2: 2, 3: 1, 4: 3 } },
            { id: 3, name: "Alice", products: { 1: 3, 2: 1 } },
        ],
    };


    return (
        <GuestEventPage event={event} />
    );
};

export default Event;
