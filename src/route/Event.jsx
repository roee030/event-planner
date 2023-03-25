import React from 'react';
import GuestEventPage from './GuestEventPage';

// const event = {
//     id: 1,
//     title: "My Party",
//     date: new Date("2023-03-01T12:00:00"),
//     numberOfGuests: 6,
//     location: "123 Main St, Anytown, USA",
//     products: [
//         { id: 1, name: "Chips", price: 5, quantity: 3 },
//         { id: 2, name: "Soda", price: 5, quantity: 2 },
//         { id: 3, name: "Pizza", price: 10, quantity: 6 },
//         { id: 4, name: "Beer", price: 3, quantity: 8 },
//     ],
//     attendees: [
//         { id: 1, name: "John", products: [{ productId: 1, quantity: 2 }, { productId: 3, quantity: 1 }] },
//         { id: 2, name: "Bob", products: [{ productId: 2, quantity: 1 }, { productId: 2, quantity: 2 }, { productId: 3, quantity: 1 }, { productId: 4, quantity: 3 }] },
//         { id: 3, name: "Alice", products: [{ productId: 3, quantity: 3 }, { productId: 2, quantity: 1 }] },
//     ]
// };
const Event = ({ user }) => {


    return (
        <GuestEventPage currentUser={user} />
    );
};

export default Event;
// also to add a nice UI in the same line of the product to have an circles of the each attendee the bring the specific product and if we hover the circle