/**
 * Load all global libraries as a service, for example `lodash` is available as
 * the `_` service.  This allows all of the globals to be mocked.
 *
 * Note the `[]`, this is the constructor.  When you call
 * `module` without the second parameter, it is a getter.
 */
angular.module('global-libraries', [])
  .factory('_', function () {
    // console.log('lodash', window._.VERSION);
    return window._; // / Must be loaded beforehand.
  })
  .factory('SockJS', function () {
    return window.SockJS;
  })
  .factory('moment', function () {
    return window.moment;
  });
