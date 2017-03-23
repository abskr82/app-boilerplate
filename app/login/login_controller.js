(function () {
  'use strict';

  angular.module('lighting-ui-login', [
    'ui.router',
    'ui.bootstrap'
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
        })

    })

    .controller('LoginController', function ($scope, $rootScope) {
 // jshint ignore:line
    //   $scope.inProgress = false;
    //   $scope.username = '';
    //   function doPostLoginTasks() {
    //     AuthService.changePasswordStatus().then(result => {
    //       if (result.status !== 200) {
    //         $scope.alerts = [
    //           {
    //             type: 'danger',
    //             msg: 'Error verifying user status'
    //           }
    //         ];
    //       } else if (result.data.password_changed === '') {
    //         $state.go('change_password');
    //       } else {
    //         EulaService.verifyLicenseAgreement()
    //           .then(userHasAcceptedLicenseAgreement => {
    //             if (!userHasAcceptedLicenseAgreement) {
    //               return AuthService.logout($scope.username)
    //                 .then(() => {
    //                   $rootScope.$broadcast('ClearSocketInterval');
    //                   $state.go('login');
    //                   $scope.inProgress = false;
    //                 });
    //             }
                
    //             AuthService.setAuthenticated(true);
    //             LightSocket.open();
    //             AlarmService.refresh();

    //             if (PermissionService.getRole() === 'Scene Control') {
    //               $state.go('scene');
    //             } else if (PermissionService.can('mode.support')) {
    //               $state.go('config');
    //             } else {
    //               $state.go('devices');
    //             }
    //           });
    //       }
    //     });
    //   }

    //   $scope.logIn = function (username, password) {
    //     if (username !== undefined && password !== undefined) {
    //       $scope.inProgress = true;
    //       AuthService.login(username, password).then(function (result) {
    //         $scope.username = username;
    //         if (result.status !== 200) {
    //           $scope.inProgress = false;
    //           if(result.data === "Invalid username or password"){
    //             result.data = 'Invalid login credentials'
    //           }
    //           $scope.alerts = [
    //             {
    //               type: 'danger',
    //               msg: result.data
    //             }
    //           ];
    //         } 
                    
    //         else {
    //           doPostLoginTasks();
    //         }
    //       }).finally(function () {
    //         $scope.login = {
    //           email: '',
    //           password: ''
    //         };
    //       });
    //     }
    //   };

    //   AuthService.isAuthenticated().then(isAuthed => {
    //     if (isAuthed) {
    //       doPostLoginTasks();
    //     }
    //   });
    // })

    });
})();
