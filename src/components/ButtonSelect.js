import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from 'components/Button';

import 'styles/components/ButtonSelect.scss';

const buttonSelectConfig = {
  disableOnChangeWhenDisabled: true,
  disableOnClickWhenDisabled: false,
};

class ButtonSelect extends Component {
  static propTypes = {
    // button select
    options: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string,
      onClick: PropTypes.func,
    })).isRequired,
    className: PropTypes.string,

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
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(cb) {
    return e => {
      if (!buttonSelectConfig.disableOnChangeWhenDisabled || !this.props.disabled) {
        if (e.target.value === this.props.value) {
          if (this.props.nullable) {
            this.props.onChange({ ...e, target: { ...e.target, value: '' } });
          }
        } else {
          this.props.onChange(e);
        }
      }
      if (cb && (!buttonSelectConfig.disableOnClickWhenDisabled || !this.props.disabled)) {
        cb(e);
      }
    };
  }

  render() {
    return (
      <div
        className={classnames(
          'ButtonSelect',
          this.props.className,
          {
            'ButtonSelect--error': this.props.error,
            'ButtonSelect--loading': this.props.loading,
            'ButtonSelect--fullWidth': this.props.fullWidth,
          }
        )}
      >
        {this.props.label ? <label className="ButtonSelect__label">{this.props.label}</label> : null}
        <div className="ButtonSelect__buttons">
          {this.props.options.map(option => (<Button
            key={option.value}
            className={classnames(
              'ButtonSelect__Button',
              { 'ButtonSelect__Button--selected': option.value === this.props.value }
            )}
            onClick={this.clickHandler(option.onClick)}
            value={option.value}
          >
            {option.text}
          </Button>))}
        </div>
        {this.props.error
          ? <div className="ButtonSelect__error">
            {Array.isArray(this.props.error)
              ? <ul>
                {this.props.error.map(error => <li key={error}>{error}</li>)}
              </ul>
              : this.props.error}
          </div>
          : <div className="ButtonSelect__error" />}
      </div>
    );
  }
}

export default ButtonSelect;
