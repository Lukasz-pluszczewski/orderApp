import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon as FontAwesomeIcon } from 'react-fa';

class Icon extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x']),
    rotate: PropTypes.oneOf(['45', '90', '135', '180', '225', '270', '315']),
    flip: PropTypes.oneOf(['horizontal', 'vertical']),
    fixedWidth: PropTypes.bool,
    spin: PropTypes.bool,
    pulse: PropTypes.bool,
    stack: PropTypes.oneOf(['1x', '2x']),
    inverse: PropTypes.bool,
    Component: PropTypes.node,
    onClick: PropTypes.func,
  };

  render() {
    return <FontAwesomeIcon
      name={this.props.name}
      className={this.props.className}
      size={this.props.size}
      rotate={this.props.rotate}
      flip={this.props.flip}
      fixedWidth={this.props.fixedWidth}
      spin={this.props.spin}
      pulse={this.props.pulse}
      stack={this.props.stack}
      inverse={this.props.inverse}
      Component={this.props.Component}
      onClick={this.props.onClick}
    />;
  }
}

export default Icon;
