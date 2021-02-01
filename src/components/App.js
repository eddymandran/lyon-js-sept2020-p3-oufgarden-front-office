import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Router } from 'react-router';
import { ToastProvider } from 'react-toast-notifications';
import Navbar from './Navbar';
import Login from './Login';
import Feed from './Feed';
import Garden from './Garden';
import UserDetails from './UserDetails';
import UserEdition from './UserEdition';
import Action from './Action';
import TimeSlot from './TimeSlot';
import { LoginProvider } from './_context/LoginContext';

import history from '../history';
import ArticlesDetails from './ArticlesDetails';
import GardenInfos from './GardenInfos';
import MyCalendar from './Calendar';

const App = () => {
  return (
    <div className="global-page">
      <LoginProvider>
        <ToastProvider placement="top-right">
          <Router history={history}>
            <Navbar />
            <div className="App">
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/feed" component={Feed} />
                <Route exact path="/user" component={UserDetails} />
                <Route exact path="/user/edition" component={UserEdition} />
                <Route exact path="/articles" /* component={Articles}  */ />
                <Route exact path="/articles/:id" component={ArticlesDetails} />
                <Route exact path="/garden" component={Garden} />
                <Route exact path="/garden/:id" component={GardenInfos} />
                <Route
                  exact
                  path="/garden/:gardenId/action/:id"
                  component={Action}
                />
                <Route
                  exact
                  path="/garden/:id/timeslots"
                  component={TimeSlot}
                />
                <Route path="/garden/:id/calendar" component={MyCalendar} />
              </Switch>
            </div>
          </Router>
        </ToastProvider>
      </LoginProvider>
    </div>
  );
};

export default App;
