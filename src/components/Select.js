import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';

import 'styles/components/Select.scss';

class Select extends Component {
  static propTypes = {
    // select
    options: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string,
      onClick: PropTypes.func,
    })).isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.shape({ value: PropTypes.string, text: PropTypes.string }).isRequired,

    // state
    value: PropTypes.string,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,

    // actions
    onChange: PropTypes.func.isRequired,

    // label
    label: PropTypes.node,

    // error
    error: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),

    // settings
    fullWidth: PropTypes.bool,
    nullable: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    const newValue = e.target.value;

    // calling onClick for this option
    const newValueOnClick = _.find(this.props.options, { value: newValue });
    if (newValueOnClick && newValueOnClick.onClick) {
      newValueOnClick.onClick(e);
    }

    // calling onChange
    this.props.onChange(e);
  }

  render() {
    return (
      <div
        className={classnames(
          'Select',
          this.props.className,
          {
            'Select--error': this.props.error,
            'Select--loading': this.props.loading,
            'Select--fullWidth': this.props.fullWidth,
          }
        )}
      >
        {this.props.label ? <label className="Select__label">{this.props.label}</label> : null}

        <select
          className="Select__select"
          value={this.props.value}
          onChange={this.changeHandler}
          disabled={this.props.disabled}
        >
          {this.props.nullable || !this.props.value
            ? <option value={this.props.placeholder.value}>{this.props.placeholder.text}</option>
            : null}
          {this.props.options.map(option => <option key={option.value} value={option.value}>{option.text}</option>)}
        </select>

        {this.props.error
          ? <div className="Select__error">
            {Array.isArray(this.props.error)
              ? <ul>
                {this.props.error.map(error => <li key={error}>{error}</li>)}
              </ul>
              : this.props.error}
          </div>
          : <div className="Select__error" />}
      </div>
    );
  }
}

export default Select;
