import React, { useState } from 'react';
import CreateEventForm from './CreateEventForm';

function CreateEvent() {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [guestList, setGuestList] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Make a POST request to the server with the form data
        fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: eventName,
                date: eventDate,
                time: eventTime,
                guests: guestList.split('\n').map((guest) => guest.trim()),
            }),
        })
            .then((response) => response.json())
            .then(() => {
                // Reset the form state variables
                setEventName('');
                setEventDate('');
                setEventTime('');
                setGuestList('');
            });
    };

    return (
        <div>
            <h2>Create New Event</h2>
            <CreateEventForm
                eventName={eventName}
                setEventName={setEventName}
                eventDate={eventDate}
                setEventDate={setEventDate}
                eventTime={eventTime}
                setEventTime={setEventTime}
                guestList={guestList}
                setGuestList={setGuestList}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

export default CreateEvent;
