import React from 'react';
import { Route, Switch } from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

import App from 'containers/App';
import HomePage from 'pages/HomePage';
import FormPage from 'pages/FormPage';
import OrderPage from 'pages/OrderPage';

import ComponentsPage from 'pages/ComponentsPage';
import NotFoundPage from 'pages/NotFoundPage.js';

export default (
  <ConnectedRouter history={createHistory()}>
    <App>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/form" component={FormPage} />
        <Route path="/components" component={ComponentsPage} />
        <Route path="/order" component={OrderPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </App>
  </ConnectedRouter>
);
