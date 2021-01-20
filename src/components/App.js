import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Router } from 'react-router';
import { ToastProvider } from 'react-toast-notifications';
import Navbar from './Navbar';
import Login from './Login';
import Feed from './Feed';
import Garden from './Garden';
import Action from './Action';

/* import { UserProvider } from './_context/UserContext'; */
import history from '../history';
import ArticlesDetails from './ArticlesDetails';

const App = () => {
  return (
    <div>
      <ToastProvider placement="top-right">
        {/* <UserProvider> */}
        <Router history={history}>
          <Navbar />
          <div className="App">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/feed" component={Feed} />
              <Route exact path="/articles" /* component={Articles}  */ />
              <Route exact path="/articles/:id" component={ArticlesDetails} />
              <Route exact path="/garden" component={Garden} />
              <Route exact path="/garden/:id" />
              <Route exact path="/garden/:id/action" component={Action} />
              <Route exact path="/garden/:id/timeslot" />
              <Route exact path="/garden/:id/Plot" />
              <Route exact path="/garden/:id/Plot/confirm" />
              <Route exact path="/garden/:id/Plot/success" />
            </Switch>
          </div>
        </Router>
        {/* </UserProvider> */}
      </ToastProvider>
    </div>
  );
};

export default App;
