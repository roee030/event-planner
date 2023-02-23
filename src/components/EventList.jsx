import React, { useState, useEffect } from 'react';

function EventList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch the list of events from the server and update the state
        fetch('/api/events')
            .then(response => response.json())
            .then(data => setEvents(data));
    }, []);

    return (
        <div>
            <h2>My Events</h2>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <p>{event.name}</p>
                        <p>{event.date}</p>
                        <p>{event.time}</p>
                        <p>{event.guests.length} guests</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventList;
