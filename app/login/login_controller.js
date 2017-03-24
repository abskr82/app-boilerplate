(function () {
  'use strict';
 angular.module('lighting-ui-login', [
    'ui.router'
  ])
    .config(function ($stateProvider) {
      $stateProvider
        .state('login', {
          url: '/login',
          views: {
            // nav: {
            //   template: require('../nav/nav-header.html'),
            //   controller: ['$scope', 'ACTIVE_THEME', function ($scope, ACTIVE_THEME) {
            //     $scope.ACTIVE_THEME = ACTIVE_THEME;
            //   }]
            // },
            content: {
              template: require('./login.html'),
              controller: 'LoginController'
            }
          },
          access: {
            isPublic: true
          }
        });
    })
    .controller('LoginController', function ($scope, $rootScope, AuthService, $state) {
 // jshint ignore:line
      $scope.inProgress = false;
      function doPostLoginTasks() {
        AuthService.setAuthenticated(true);
        // LightSocket.open();
        // AlarmService.refresh();
        // if (PermissionService.getRole() === 'Scene Control') {
        //   $state.go('scene');
        // } else {
          // $state.go('search');
          $state.go('dashboard');
        // }
      }
      $scope.logIn = function (username, password) {
        console.log('heyy');
        if (username !== undefined && password !== undefined) {
          $scope.inProgress = true;
          AuthService.login(username, password).then(function (result) { 
            console.log(result);
            if (result.status !== 200) {
              $scope.inProgress = false;
              if(result.data === "Invalid username or password"){
                result.data = 'Invalid login credentials'
              }
              $scope.alerts = [
                {
                  type: 'danger',
                  msg: result.data
                }
              ];
            } 
                    
            else {
              doPostLoginTasks();
            }
          }).finally(function () {
            $scope.login = {
              email: '',
              password: ''
            };
          });
        }
      };
      AuthService.isAuthenticated().then(function (isAuthed) {
        if (isAuthed) {
          doPostLoginTasks();
        }
      });
    });
})();