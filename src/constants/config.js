import _ from 'lodash';

const configs = {
  default: {},
  development: {},
  production: {},
  test: {},
};

const config = configs.default;

if (window.env.environment) {
  _.merge(config, configs[window.env.environment] || {});
}

export default config;
