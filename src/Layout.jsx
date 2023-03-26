import { useState } from 'react';
import { AppBar, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Button } from '@material-ui/core';
import { Menu as MenuIcon, Close as CloseIcon, Home as HomeIcon, Event as EventIcon, Add as AddIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),

    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    activeLink: {
        color: theme.palette.primary.main,
        fontWeight: 'bold',
    },
}));

function Layout({ user, setUser, children }) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };
    const logout = () => {
        axios.get('http://localhost:3000/auth/logout')
            .then(() => {
                // Remove token from local storage
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                setUser(null);
            })
            .catch((error) => {
                console.error(error);
            });

        history.push('/login');

    };

    const drawer = (
        <div>
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerToggle}>
                    <CloseIcon />
                </IconButton>
            </div>
            <List>
                <ListItem button component={Link} to="/" selected={location.pathname === '/'}>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/create-event" selected={location.pathname === '/create-event'}>
                    <ListItemIcon><AddIcon /></ListItemIcon>
                    <ListItemText primary="Create Event" />
                </ListItem>
                <ListItem button component={Link} to="/events" selected={location.pathname === '/events'}>
                    <ListItemIcon><EventIcon /></ListItemIcon>
                    <ListItemText primary="Events" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="Open drawer" edge="start" onClick={handleDrawerToggle} className={classes.menuButton}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Event Planner
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    <Button color="inherit" component={Link} to="/events" className={location.pathname === '/events' ? classes.activeLink : ''}>
                        Events
                    </Button>
                    <Button color="inherit" component={Link} to="/create-event" className={location.pathname === '/create-event' ? classes.activeLink : ''}>
                        Create Event
                    </Button>
                    {user ? (
                        <Button color="inherit" onClick={logout}>
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/signup" className={location.pathname === '/signup' ? classes.activeLink : ''}>
                                Signup
                            </Button>
                            <Button color="inherit" component={Link} to="/login" className={location.pathname === '/login' ? classes.activeLink : ''}>
                                Login
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="temporary"
                anchor="left"
                open={open}
                onClose={handleDrawerToggle}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                {drawer}
            </Drawer>
            <main className={classes.content}>
                <div className={classes.drawerHeader} />
                {children}
            </main>
        </div>
    );
}

export default Layout;
