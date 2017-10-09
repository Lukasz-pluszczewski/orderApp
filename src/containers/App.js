import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import connectSocket from 'services/socket';

import { internetConnected, internetDisconnected, serverConnected, serverDisconnected } from 'actions/statusActions';

class App extends Component {
  static propTypes = {
    // props
    children: PropTypes.element,

    // redux actions
    internetConnected: PropTypes.func,
    internetDisconnected: PropTypes.func,
    serverConnected: PropTypes.func,
    serverDisconnected: PropTypes.func,
  };

  componentWillMount() {
    connectSocket({
      onConnect: this.props.serverConnected,
      onDisconnect: this.props.serverDisconnected,
    });
    window.addEventListener('online',  this.props.internetConnected);
    window.addEventListener('offline', this.props.internetDisconnected);
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(connect(
  null,
  {
    internetConnected,
    internetDisconnected,
    serverConnected,
    serverDisconnected,
  }
)(App));
