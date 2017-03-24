/**
 * Loaded defaults as a service. API_CONFIG is injected by
 * Webpack using the DefinePlugin
 */
angular.module('lighting-ui-components')
  .constant('Defaults', API_CONFIG);
