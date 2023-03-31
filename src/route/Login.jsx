import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(2),
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function Login({ setUser }) {
    const classes = useStyles();
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        axios.post('http://localhost:3000/auth/login', { username, password })
            .then(response => {
                console.log(response);
                setUser(response.data.user);
                const token = response.data.token;
                localStorage.setItem('authToken', token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                history.push('/');
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className={classes.root}>
            <Typography variant="h4">Login</Typography>
            <form className={classes.form}>
                <TextField
                    label="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    variant="outlined"
                />
                <TextField
                    label="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    variant="outlined"
                    type="password"
                />
                <Button variant="contained" onClick={handleLogin}>
                    Login
                </Button>
            </form>
        </div>
    );
}

export default Login;
