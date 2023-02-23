import React from 'react';
import { Link } from 'react-router-dom';

function Layout({ children }) {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/event">Event</Link>
                    </li>
                </ul>
            </nav>
            <main>{children}</main>
        </div>
    );
}

export default Layout;