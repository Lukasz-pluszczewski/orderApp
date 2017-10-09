import { Component } from 'react';
import PropTypes from 'prop-types';

export default class App extends Component {
  static propTypes = {
    // props
    children: PropTypes.element,
  };

  render() {
    return this.props.children;
  }
}
