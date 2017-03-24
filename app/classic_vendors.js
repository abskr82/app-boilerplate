require('../node_modules/angular-ui-router/release/angular-ui-router.min.js');
require('../node_modules/angular-bootstrap/ui-bootstrap.min.js');
require('../node_modules/angular-bootstrap/ui-bootstrap-tpls.min.js');
require('../node_modules/angular-resource/angular-resource.min.js');
require('../node_modules/angular-mocks/angular-mocks.js');
require('../node_modules/lodash/lodash.js');

export default angular.module('lighting_ui.classic_vendors', [
  'ui.router',
  'ui.bootstrap',
  'ngMessages',
  'ngResource',
  'ngMockE2E'
]);
