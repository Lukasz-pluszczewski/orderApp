import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import App from 'containers/App';
import OrderPage from 'pages/OrderPage';

export default (
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/" component={OrderPage}/>
      </Switch>
    </App>
  </BrowserRouter>
);
