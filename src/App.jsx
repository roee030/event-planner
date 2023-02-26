import { Switch, Route } from 'react-router-dom';
import Home from './route/Home';
import Event from './route/Event';
import Layout from './Layout';
import CreateEvent from './components/create-event/CreateEvent';
import NotFound from './route/NotFound';

function App() {
  return (
    <div className="App">
      <Layout>
        <div className="main-content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/event/:id">
              <Event />
            </Route>
            <Route exact path="/event">
              <Event />
            </Route>
            <Route exact path="/create-event">
              <CreateEvent />
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
