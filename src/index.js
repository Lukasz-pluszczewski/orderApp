import React from 'react';
import { render } from 'react-dom';

import routes from './routes';

import './favicon.png';
import './styles/styles.scss';

render(
  routes,
  document.getElementById('app')
);
