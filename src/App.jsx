import { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Home from './route/Home';
import Events from './route/Events';
import EventPage from './route/EventPage';
import Layout from './Layout';
import CreateEvent from './components/create-event/CreateEvent';
import NotFound from './route/NotFound';
import Login from './route/Login';
import Signup from './route/Signup';
import axios from 'axios';


function App() {
  const history = useHistory();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      // If token exists in local storage, send a request to server to check if user is authenticated
      axios.get('http://localhost:3000/auth/check-auth', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then(response => {
          setUser({ ...user, ...response.data.user });
        })
        .catch(error => {
          console.log(error);
          localStorage.removeItem('authToken');
          history.push('/login');
        });
    } else {
      history.push('/login');
    }
  }, []);

  return (
    <div className="App">
      <Layout>
        <div className="main-content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/event/:id">
              <EventPage currentUser={user} />
            </Route>
            <Route exact path="/events">
              <Events user={user} />
            </Route>
            <Route exact path="/create-event">
              <CreateEvent />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Layout>
    </div>
  );
}

export default App;
