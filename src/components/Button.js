import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import classnames from 'classnames';
import { Icon } from 'react-fa';

import 'styles/components/Button.scss';

const buttonConfig = {
  disableOnClickWhenDisabled: false,
  disableHrefLinksWhenDisabled: true,
  disableToLinksWhenDisabled: true,
  disableOnBlurWhenDisabled: false,
  disableOnFocusWhenDisabled: false,
  disableButtonWhenLoading: false,
  loadingIconName: 'circle-o-notch',
};

class Button extends Component {
  static propTypes = {
    // button
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    className: PropTypes.string,
    value: PropTypes.string,

    // state
    disabled: PropTypes.bool,
    loading: PropTypes.bool,

    // action
    href: PropTypes.string,
    to: PropTypes.string,
    onClick: PropTypes.func, // onClick handler does not work when button is in RouterLink mode (when `to` prop is provided)
    target: PropTypes.string,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,

    // icon
    icon: PropTypes.string,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    iconClassName: PropTypes.string,
  };

  getIcon() {
    if (typeof this.props.icon === 'string') {
      return (
        <Icon
          className={classnames('Button__Icon', this.props.iconClassName)}
          name={this.props.icon}
        />
      );
    }
    return (
      <div className={classnames('Button__Icon', this.props.iconClassName)}>
        {this.props.icon}
      </div>
    );
  }

  render() {
    const classNames = classnames(
      this.props.className,
      'Button',
      {
        'Button--disabled': this.props.disabled,
        'Button--loading': this.props.loading,
        'Button--withIcon': this.props.icon,
        'Button--iconRight': this.props.iconPosition === 'right',
      }
    );

    const disabled = this.props.disabled || (buttonConfig.disableButtonWhenLoading && this.props.loading);

    if (this.props.href) {
      return (
        <a
          className={classNames}
          href={buttonConfig.disableHrefLinksWhenDisabled && disabled ? null :this.props.href}
          target={this.props.target}
          onBlur={buttonConfig.disableOnBlurWhenDisabled && disabled ? null : this.props.onBlur}
          onFocus={buttonConfig.disableOnFocusWhenDisabled && disabled ? null : this.props.onFocus}
          onClick={buttonConfig.disableOnClickWhenDisabled && disabled ? null : this.props.onClick}
        >
          {this.props.children}
          {this.props.icon ? this.getIcon() : null}
          {this.props.loading ? <Icon className="Button__loadingIcon" name="circle-o-notch" spin /> : null}
        </a>
      );
    }
    if (this.props.to) {
      return (
        <RouterLink
          className={classNames}
          to={buttonConfig.disableToLinksWhenDisabled && disabled ? null : this.props.to}
          onBlur={buttonConfig.disableOnBlurWhenDisabled && disabled ? null : this.props.onBlur}
          onFocus={buttonConfig.disableOnFocusWhenDisabled && disabled ? null : this.props.onFocus}
          onClick={buttonConfig.disableOnClickWhenDisabled && disabled ? null : this.props.onClick}
        >
          {this.props.children}
          {this.props.icon ? this.getIcon() : null}
          {this.props.loading
            ? <Icon className="Button__loadingIcon" name={buttonConfig.loadingIconName} spin />
            : null}
        </RouterLink>
      );
    }
    return (
      <button
        className={classNames}
        onBlur={buttonConfig.disableOnBlurWhenDisabled && disabled ? null : this.props.onBlur}
        onFocus={buttonConfig.disableOnFocusWhenDisabled && disabled ? null : this.props.onFocus}
        value={this.props.value}
        onClick={buttonConfig.disableOnClickWhenDisabled && disabled ? null : this.props.onClick}
      >
        {this.props.children}
        {this.props.icon ? this.getIcon() : null}
        {this.props.loading ? <Icon className="Button__loadingIcon" name="circle-o-notch" spin /> : null}
      </button>
    );
  }
}

export default Button;
