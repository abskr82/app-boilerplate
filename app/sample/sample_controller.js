(function () {
  'use strict';

  angular.module('lighting-ui-sample', ['ui.router'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('sample', {
          url: '/smaple',
          views: {
            content: {
              template: require('./sample.html'),
              controller: 'Sample'
            }
          },
          access: {isPublic: true}
        });
    })
    .controller('Sample', function (_, $scope, $rootScope,$window) {
     
    });
}());
