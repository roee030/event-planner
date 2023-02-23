import React from 'react';

function GuestList({ guests = [], onAddGuest, onRemoveGuest }) {
    const handleAddGuest = () => {
        onAddGuest();
    };

    const handleRemoveGuest = (index) => {
        onRemoveGuest(index);
    };

    const getTotalGuests = () => {
        return guests.reduce((total, guest) => total + guest.attendees, 0);
    };

    const getTotalCost = () => {
        const totalGuests = getTotalGuests();
        if (totalGuests === 0) {
            return 0;
        }
        const totalProducts = guests.reduce(
            (total, guest) => total + guest.products.length,
            0
        );
        return totalProducts / totalGuests;
    };

    return (
        <div>
            <h2>Guest List</h2>
            <button onClick={handleAddGuest}>Add Guest</button>
            <p>Total Guests: {getTotalGuests()}</p>
            <p>Average Cost Per Guest: ${getTotalCost()}</p>
            {guests.map((guest, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={guest.name}
                        onChange={(e) =>
                            onRemoveGuest ? onRemoveGuest(index, e.target.value) : null
                        }
                    />
                    <label>
                        Attendees:
                        <input
                            type="number"
                            min="1"
                            value={guest.attendees}
                            onChange={(e) =>
                                onRemoveGuest
                                    ? onRemoveGuest(index, null, parseInt(e.target.value))
                                    : null
                            }
                        />
                    </label>
                    <label>
                        Products:
                        <input
                            type="text"
                            value={guest.products.join(', ')}
                            onChange={(e) =>
                                onRemoveGuest
                                    ? onRemoveGuest(index, null, null, e.target.value.split(', '))
                                    : null
                            }
                        />
                    </label>
                    {onRemoveGuest && (
                        <button onClick={() => handleRemoveGuest(index)}>
                            Remove Guest
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}

export default GuestList;
