(function () {
  'use strict';

  angular.module('lighting-ui-dashboard', [
    'ui.router',
    'ui.bootstrap'
  ])
    .config(function ($stateProvider) {
      $stateProvider
        .state('dashboard', {
          url: '/dashboard',
          views: {
            // nav: {
            //   template: require('../nav/nav-header.html'),
            //   controller: ['$scope', 'ACTIVE_THEME', function ($scope, ACTIVE_THEME) {
            //     $scope.ACTIVE_THEME = ACTIVE_THEME;
            //   }]
            // },
            content: {
              template: require('./dashboard.html'),
              controller: 'Dashboard'
            }
          },
          access: {
            isPublic: true
          }
        })

    })

    .controller('Dashboard', function ($scope, $rootScope, Contact, $http) {
        $scope.lights = [];
        $scope.zones = [];
        $scope.zones.title = 'Zones';
    });
})();
