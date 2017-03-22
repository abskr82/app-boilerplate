const createWebpackConfig = require('./webpack.config');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = function createDashboardConfig(env) {
  const config = createWebpackConfig(env);

  config.plugins.push(new DashboardPlugin());

  return config;
}