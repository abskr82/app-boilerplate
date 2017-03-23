(function () {
  'use strict';

  angular.module('lighting-ui-sampleTwo', [
    'ui.router',
    'ui.bootstrap'
  ])
    .config(function ($stateProvider) {
      $stateProvider
        .state('sampleTwo', {
          url: '/sampleTwo',
          views: {
            // nav: {
            //   template: require('../nav/nav-header.html'),
            //   controller: ['$scope', 'ACTIVE_THEME', function ($scope, ACTIVE_THEME) {
            //     $scope.ACTIVE_THEME = ACTIVE_THEME;
            //   }]
            // },
            content: {
              template: require('./sampleTwo.html'),
              controller: 'sampleTwoController'
            }
          },
          access: {
            isPublic: true
          }
        })

    })

    .controller('sampleTwoController', function ($scope, $rootScope, Contact, $http) {
     
    });
})();
