import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';
import { Icon } from 'react-fa';

import Tooltip from 'components/Tooltip';

import 'styles/components/Input.scss';

const inputConfig = {
  loadingIconName: 'circle-o-notch',
  onBlurChangeFromEmpty: false, // should onBlurChange be triggered when change was from empty value
};

class Input extends Component {
  static propTypes = {
    // input
    id: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,

    // state
    value: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    loading: PropTypes.bool,

    // actions
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    onBlurChange: PropTypes.func, // callback triggered onBlur but only if something changed

    // label
    label: PropTypes.node,

    // error
    error: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),

    // icon
    icon: PropTypes.string,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    onIconClick: PropTypes.func,
    iconClassName: PropTypes.string,

    // html options
    options: PropTypes.arrayOf(PropTypes.string),

    // settings
    fullWidth: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.renderIcon = this.renderIcon.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.focus = this.focus.bind(this);

    this.id = props.id ? null : _.uniqueId('input');

    this.lastBlurValue = props.value || ''; // field holding the last blur value (or initial value)
  }

  /**
   * Sets focus on input
   */
  focus() {
    this.inputRef.focus();
  }

  /**
   * Function to handle blur on input element, conditionally triggering onBlurChange handler
   * @param {event} e event
   */
  handleBlur(e) {
    if (this.props.onBlurChange) {
      if (_.isNil(this.props.value)) {
        console.error('You try to use onBlurChange event on uncontrolled element. This has not been implemented yet. onBlurChange handler will be ignored');
      } else {
        if (
          this.props.value !== this.lastBlurValue // checking if value really changed
          && (inputConfig.onBlurChangeFromEmpty || this.lastBlurValue !== '') // checking if previous blur value has been empty string
        ) {
          this.props.onBlurChange(e);
        }
      }
    }
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
    this.lastBlurValue = this.props.value;
  }

  /**
   * Function to handle change event on input, additionally setting changedFromLastBlur flag to true
   * @param e
   */
  handleChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  renderIcon() {
    if (typeof this.props.icon === 'string') {
      return (
        <Icon
          className={
            classnames('Input__Icon', this.props.iconClassName)
          }
          onClick={this.props.onIconClick}
          name={this.props.icon}
        />
      );
    }
    return (
      <div
        className={classnames('Input__Icon', this.props.iconClassName)}
        onClick={this.props.onIconClick}
      >
        {this.props.icon}
      </div>
    );
  }

  render() {
    const id = this.props.id || this.id;

    return (
      <div
        className={classnames(
          'Input',
          {
            'Input--error': this.props.error,
            'Input--loading': this.props.loading,
            'Input--withIcon': this.props.icon,
            'Input--iconRight': this.props.iconPosition === 'right',
            'Input--fullWidth': this.props.fullWidth,
          },
          this.props.className
        )}>
        {this.props.label ? <label className="Input__label" htmlFor={id}>{this.props.label}</label> : null}
        <Tooltip
          visible={!!this.props.errorDetails}
          animation="zoom"
          trigger={[]}
          overlay={<ul className="Input__tooltipContent">
            {this.props.errorDetails && this.props.errorDetails.map(detail => (<li>{detail}</li>))}
          </ul>}
        >
          <input
            id={id}
            ref={input => this.inputRef = input}
            list={this.props.options ? `${id}list` : null}
            className="Input__input"
            name={this.props.name}
            type={this.props.type}
            value={this.props.value}
            checked={this.props.checked}
            disabled={this.props.disabled}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onKeyDown={this.props.onKeyDown}
          />
        </Tooltip>

        {this.props.icon ? this.renderIcon() : null}
        {this.props.loading ? <Icon className="Input__loadingIcon" name={inputConfig.loadingIconName} spin /> : null}

        {this.props.error
          ? <div className="Input__error">
            {Array.isArray(this.props.error)
              ? <ul>
                {this.props.error.map(error => <li key={error}>{error}</li>)}
              </ul>
              : this.props.error}
          </div>
          : <div className="Input__error" />}

        {this.props.options
          ? <datalist id={`${id}list`}>
            {this.props.options.map(option => <option key={option} value={option} />)}
          </datalist>
          : null}
      </div>
    );
  }
}

export default Input;
