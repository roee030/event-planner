import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const LogoutButton = () => {
    const history = useHistory();

    const handleLogout = () => {
        axios.get('/logout').then(() => {
            history.push('/login');
        });
    };

    return (
        <Button variant="contained" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;
