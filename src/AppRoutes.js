import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

// Components
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import MovieDetails from './pages/Details';

const AppRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/details/:movieId" component={MovieDetails} />
      <Route component={ErrorPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRoutes;
