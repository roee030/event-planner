import { Switch, Route } from 'react-router-dom';
import Home from './route/Home';
import Event from './route/Event';
import Layout from './Layout';
import CreateEvent from './components/CreateEvent';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/event/:id">
            <Event />
          </Route>
          <Route exact path="/create-event">
            <CreateEvent />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}
export default App;
