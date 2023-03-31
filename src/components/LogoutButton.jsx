import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const LogoutButton = ({ setUser, setIsAuthenticated }) => {
    const history = useHistory();

    function handleLogout() {
        axios.get('http://localhost:3000/auth/logout', {
            withCredentials: true // include credentials (session cookie) in the request
        })
            .then(() => {
                // Clear user data and redirect to login page
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                setIsAuthenticated(false);
                setUser(null);
                history.push('/login');
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <Button variant="contained" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;
