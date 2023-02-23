import React, { useState } from 'react';

function EventForm({ onSubmit, onCancel, event = {} }) {
    const [name, setName] = useState(event.name || '');
    const [date, setDate] = useState(event.date || '');
    const [time, setTime] = useState(event.time || '');
    const [location, setLocation] = useState(event.location || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEvent = {
            id: event.id || Date.now(),
            name,
            date,
            time,
            location,
            guests: event.guests || [],
            products: event.products || []
        };
        onSubmit(newEvent);
    };

    const handleCancel = (e) => {
        e.preventDefault();
        onCancel();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Event Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Event Date:
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Event Time:
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Event Location:
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
            </label>
            <br />
            <button type="submit">{event.id ? 'Save' : 'Create'}</button>
            <button type="button" onClick={handleCancel}>
                Cancel
            </button>
        </form>
    );
}

export default EventForm;
