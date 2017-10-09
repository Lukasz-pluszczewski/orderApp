/* eslint-disable import/first */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import routes from './routes';
import configureStore from './store/configureStore';

import './favicon.png';
import './styles/styles.scss';

const store = configureStore();

// translations
import { setLanguage } from 'mi18n-redux';
import en from 'constants/translations/en';
store.dispatch(setLanguage('en', en));

render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app')
);
