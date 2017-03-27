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
            nav: {
              template: require('../nav/nav-menu.html'),
              controller: ['$scope', 'ACTIVE_THEME', function ($scope, ACTIVE_THEME) {
                $scope.ACTIVE_THEME = ACTIVE_THEME;
              }]
            },
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
        $scope.lights.title = 'Lights';
        $scope.zones.count = 10;
        

        $http.get('/lights').then(function(response) {
            $scope.lights.count = response.data.length;
            console.log(response);
        }).catch(function() {
            $scope.status = 'Failed...';
        });

    });
})();
