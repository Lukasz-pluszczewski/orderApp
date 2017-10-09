import React from 'react';
import { Route, Switch } from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

import App from 'containers/App';
import OrderPage from 'pages/OrderPage';

export default (
  <ConnectedRouter history={createHistory()}>
    <App>
      <Switch>
        <Route exact path="/" component={OrderPage}/>
      </Switch>
    </App>
  </ConnectedRouter>
);
