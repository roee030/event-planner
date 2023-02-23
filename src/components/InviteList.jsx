import { useState } from 'react';

function InviteList() {
    const [guests, setGuests] = useState([]);

    const handleAddGuest = () => {
        setGuests([...guests, '']);
    };

    const handleGuestChange = (index, value) => {
        const newGuests = [...guests];
        newGuests[index] = value;
        setGuests(newGuests);
    };

    return (
        <div>
            <h2>Invite List</h2>
            {guests.map((guest, index) => (
                <input
                    key={index}
                    value={guest}
                    onChange={(e) => handleGuestChange(index, e.target.value)}
                    placeholder={`Guest #${index + 1}`}
                />
            ))}
            <button onClick={handleAddGuest}>Add Guest</button>
        </div>
    );
}

export default InviteList;
