import React from 'react';

function EventDetails({ event, onEditEvent, onDeleteEvent }) {
    return (
        <div>
            <h2>{event.name}</h2>
            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <p>Location: {event.location}</p>
            <h3>Guest List</h3>
            <ul>
                {event.guests.map((guest) => (
                    <li key={guest.id}>{guest.name}</li>
                ))}
            </ul>
            <h3>Product List</h3>
            <ul>
                {event.products.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
            <button onClick={() => onEditEvent(event.id)}>Edit</button>
            <button onClick={() => onDeleteEvent(event.id)}>Delete</button>
        </div>
    );
}

export default EventDetails;
