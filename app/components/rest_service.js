(function () {
  'use strict';

  /**
   * The RestService wraps the build-in $http utility to provide a simple way to include certain HTTP Headers for every request.
   */
  angular.module('lighting-ui-components')
    .provider('RestService', function RestServiceProvider() {
      var baseUrl = '';

      /**
       * Sets the base URL for all HTTP requests
       * @param {string} value - URL
       */
      this.setBaseUrl = function (value) {
        baseUrl = value;
      };

      /**
       * This is a wrapper function for all HTTP requests which sets several request options. This is used to DRY up some of the code.
       *
       * For additional mime types, such as text/csv, you will need to supply the 'opts' argument to override the Accept header. Like so:
       *
       * {
       *   headers: {
       *     'Accept': 'text/csv'
       *   }
       * }
       *
       * @param  {module} $http  - ng's built in module
       * @param  {lodash} _      - lodash module
       * @param  {string} method - HTTP method name (GET, POST, PATCH, PUT..)
       * @param  {string} route  - HTTP route being requested
       * @param  {object} data   - HTTP request data or parameters
       * @param  {object} opts   - additional request options
       * @return {response}      - HTTP response
       */
      var _httpMethodWithData = function ($http, _, method, route, data, opts) {
        // Request options
        var config = {
          method: method,
          url: baseUrl + route,
          data: data,
          cache: false
        };

        // Merge options to allow for setting overrides
        if (opts) {
          config = _.merge(config, opts);
        }

        // Perform request
        console.log(config);
        return $http(config);
      };

      // Returns the service
      this.$get = function RestServiceFactory($http, _) {
        return {

          /**
           * Performs an HTTP GET request for the provided action, id, data and options.
           * @param  {string} action - action being performed on the given id
           * @param  {string} id     - id represents the object on which the action is being performed
           * @param  {object} data   - params of the get request
           * @param  {object} opts   - additional request options
           * @return {response}      - HTTP response
           */
          get: function RestServiceGet(action, id, data, opts) {
            return _httpMethodWithData($http, _, 'GET', action + '/' + id, data, opts);
          },

          /**
           * Performs an HTTP GET request on the provided route with the given params
           * @param  {string} queryname - route being queried
           * @param  {object} data      - request params
           * @return {response}         - HTTP response
           */
          query: function RestServiceQuery(queryname, data) {
            return _httpMethodWithData($http, _, 'GET', queryname, null, {params: data});
          },

          /**
           * Performs an HTTP GET request on the provided route with optional request settings
           * @param  {string} queryname - route being queried
           * @param  {object} opts      - request options
           * @return {response}         - HTTP response
           */
          all: function (table, opts) {
            return _httpMethodWithData($http, _, 'GET', table, null, opts);
          },

          /**
           * Performs an HTTP PATCH request on the provided route with the given data
           * @param  {string} queryname - route being queried
           * @param  {object} data      - request content body
           * @return {response}         - HTTP response
           */
          patch: function RestServicePatch(table, data) {
            return _httpMethodWithData($http, _, 'PATCH', table, data, null);
          },

          /**
           * Performs an HTTP POST request on the provided route with the given data
           * @param  {string} queryname - route being queried
           * @param  {object} data      - request content body
           * @return {response}         - HTTP response
           */
          post: function RestServicePost(table, data, opts) {
            return _httpMethodWithData($http, _, 'POST', table, data, opts);
          },

          /**
           * Performs an HTTP DELETE request on the provided route with the given data
           * @param  {string} queryname - route being queried
           * @param  {object} data      - request content body
           * @return {response}         - HTTP response
           */
          'delete': function RestServiceDelete(table, data) {
            return _httpMethodWithData($http, _, 'DELETE', table, data, null);
          }
        };
      };
    });
}());
