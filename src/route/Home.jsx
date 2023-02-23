import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Home Page</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/event">Event Page</Link>
                    </li>
                    <li>
                        <Link to="/create-event">Create Event Page</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Home;

